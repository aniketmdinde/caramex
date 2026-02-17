import path from "path";
import fsp from "fs/promises";
import { exists } from "../utils/exists.js";
import {helpers} from "../utils/helpers.js"
import { findAnchorIndex, findLastImportIndex } from "../utils/findIndex.js";
import { verifyAppFile } from "./verifyAppFile.js";
import { logger } from "../utils/logger.js";

export async function registerRoute(feature) {
    const folderPath = process.cwd();
    const appFilePath = path.join(folderPath, "src/app.js");
    const anchor = "// ROUTES";

    if(!await exists(appFilePath)) {
        throw new Error(`src/app.js does not exist. Did you run caramex init?`);
    }

    const importStatement = `import ${helpers.lowercase(feature)}Routes from "./routes/${helpers.lowercase(feature)}.routes.js"`;
    const registerStatement = `app.use("/api/${helpers.lowercase(feature)}", ${helpers.lowercase(feature)}Routes)`;

    let data;
    try {
        data = await fsp.readFile(appFilePath, { encoding: 'utf8' });
    } catch (error) {
        throw new Error("src/app.js is unreadable or malformed", error.message);
    }

    if(!await verifyAppFile(folderPath)) {
        throw new Error("src/app.js does not match expected express structure");
    }

    if(!data.includes("// ROUTES")) {
        throw new Error(`Anchor ${anchor} is missing from src/app.js`);
    }

    if(data.includes(importStatement) && data.includes(registerStatement)) {
        logger.warn(`${feature} is already registered in src/app.js`);
        return;
    } else if (data.includes(importStatement) || data.includes(registerStatement)){
        logger.warn(`Malformed ${feature} registration in src/app.js`);
        return;
    }

    const lines = data.split("\n");

    const importIdx = findLastImportIndex(lines);
    const anchorIdx = findAnchorIndex(lines, anchor);
    
    lines.splice(anchorIdx + 1, 0, registerStatement);
    lines.splice(importIdx + 1, 0, importStatement);

    const content = lines.join("\n");
    
    try {
        await fsp.writeFile(appFilePath, content, {encoding: "utf-8"});
        logger.success(`Registered and connected ${helpers.lowercase(feature)}Routes in src/app.js`);
    } catch (error) {
        throw new Error(`Error while writing to src/app.js`, error.message);
    }
}