import path from "path";
import fsp from "fs/promises";
import { findAnchorIndex, findLastImportIndex } from "../utils/findIndex.js";

export async function verifyAppFile(appDir) {
    try {
        const appFile = path.join(appDir, "src/app.js");
        
        const appContent = await fsp.readFile(appFile, {encoding: "utf-8"});
        
        const checksToDo = [
            `import express from "express"`,
            "app = express()",
            "export { app }"
        ];

        const anchor = "// ROUTES";
    
        for(let check of checksToDo) {
            if(!appContent.includes(check)) return false;
        }

        if(!appContent.includes(anchor)) {
            throw new Error(`Anchor ${anchor} is missing from src/app.js`);
        }

        const lines = appContent.split("\n");

        const importIdx = findLastImportIndex(lines);
        const anchorIdx = findAnchorIndex(lines, anchor);
        
        if (importIdx > anchorIdx) {
            throw new Error(
            "Invalid structure: imports found after // ROUTES. Fix src/app.js first."
            );
        }
    
        return true;
    } catch (error) {
        if(error.code === "ENOENT") {
            return false;
        }

        throw error;
    }
}