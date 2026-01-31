import { exists } from "../utils/exists.js";
import { ensureDir } from "../utils/ensureDir.js";
import { renderFile } from "../utils/renderFile.js";
import { writeFile } from "../utils/writeFile.js";
import { execSync } from "child_process"
import fsp from "fs/promises";
import path from "path";
import { verifyAppFile } from "./verifyAppFile.js";
import { verifyIndexFile } from "./verifyIndexFile.js";
import { logger } from "../utils/logger.js";
import { fileURLToPath } from "url";

async function modifyPackageFile(filePath, appDir, indexFile) {
    const content = await fsp.readFile(filePath, {encoding: "utf-8"});
    const packageData = JSON.parse(content);

    if(!packageData?.dependencies?.express) {
        execSync("npm i express");
    }

    if(!packageData?.devDependencies?.nodemon) {
        execSync("npm i -D nodemon");
    }

    if (!packageData?.scripts?.start) {
        execSync(`npm pkg set scripts.start="node ${path.relative(appDir, indexFile)}"`);
    }
    
    if(!packageData?.scripts?.dev) {
        execSync(`npm pkg set scripts.dev="nodemon ${path.relative(appDir, indexFile)}"`);
    }
}

export async function createExpressApp(appDir, projectName) {
    const entryDir = path.join(appDir, "/src");

    const routesDir = path.join(entryDir, "/routes");
    const controllersDir = path.join(entryDir, "/controllers");

    const appFile = path.join(entryDir, "app.js");
    const indexFile = path.join(entryDir, "index.js");

    const packageFile = path.join(appDir, "package.json");

    if(!await exists(packageFile)) {
        execSync(`npm init -y`);  
        execSync(`npm pkg set name=${projectName} type=module main="src/index.js"`);  
    }

    await modifyPackageFile(packageFile, appDir, indexFile);

    ensureDir(routesDir);
    ensureDir(controllersDir);

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    if(!await exists(appFile)) {
        const appContent = await renderFile(path.join(__dirname,"../templates/app.tpl"));
        await writeFile(appFile, appContent);
    } else if(!await verifyAppFile(appDir)) {
        throw new Error(
            `${appFile} does not match the required Express structure.\n` +
            `Run caramex init in a fresh directory or fix the file manually.`
        );
    }

    if(!await exists(indexFile)) {
        const indexContent = await renderFile(path.join(__dirname,"../templates/server.tpl"));
        await writeFile(indexFile, indexContent);
    } else if(!await verifyIndexFile(appDir)) {
        throw new Error(
            `${indexFile} does not match the required Express structure.\n` +
            `Run caramex init in a fresh directory or fix the file manually.`
        );
    }

    logger.success("Project initialized successfully");
}