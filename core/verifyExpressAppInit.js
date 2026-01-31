import path from "path";
import { exists } from "../utils/exists.js";
import { logger } from "../utils/logger.js";

export async function verifyExpressAppInit(appDir) {
    const entryDir = path.join(appDir, "/src");
    const packageFile = path.join(appDir, "package.json");

    const isEntryDirExists = await exists(entryDir);
    const isPackageFileExists = await exists(packageFile);

    if(isEntryDirExists && isPackageFileExists) {
        logger.error("Project already initialized\n");
        process.exit(1);
    } else if(!isEntryDirExists && !isPackageFileExists) {
        return;
    }
    
    if(!isEntryDirExists) {
        logger.error(`Project missing ${entryDir}\n`);
    } else if(!isPackageFileExists){
        logger.error(`Project missing ${packageFile}\n`);
    }
}