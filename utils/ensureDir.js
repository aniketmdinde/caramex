import path from "path";
import fsp from "fs/promises";

export async function ensureDir(dirPath) {
    const absoluteDirPath = path.resolve(dirPath);
    await fsp.mkdir(absoluteDirPath, { recursive: true });
}