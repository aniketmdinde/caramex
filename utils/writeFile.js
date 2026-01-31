import fsp from "fs/promises";
import path from "path";
import {ensureDir} from "./ensureDir.js"

export async function writeFile(filePath, content, {overwrite = false} = {}) {
    const absoluteFilePath = path.resolve(filePath);
    await ensureDir(path.dirname(absoluteFilePath));

    try {
        await fsp.writeFile(
            absoluteFilePath,
            content,
            overwrite ? undefined : { flag: "wx" } // race condition handled with flag
        );
    } catch (error) {
        if(error.code === "EEXIST") {
            throw new Error(
                `File ${absoluteFilePath} already exists. Cannot overwrite existing file.`
            );
        }

        throw error;
    }
}