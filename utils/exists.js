import path from "path";
import fs from "fs"
import fsp from "fs/promises";

export async function exists(filePath) {
    const absoluteFilePath = path.resolve(filePath);
    
    try {
        await fsp.access(absoluteFilePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        if(error.code === "ENOENT") {
            return false;
        }
        throw error;
    }
}