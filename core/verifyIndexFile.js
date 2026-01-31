import path from "path";
import fsp from "fs/promises";

export async function verifyIndexFile(appDir) {
    try {
        const indexFile = path.join(appDir, "src/index.js");
    
        const indexContent = await fsp.readFile(indexFile, {encoding: "utf-8"});
        
        const checksToDo = [
            `import { app } from "./app.js"`,
            "app.listen"
        ];
    
        for(let check of checksToDo) {
            if(!indexContent.includes(check)) return false;
        }
    
        return true;
    } catch (error) {
        if(error.code === "ENOENT") {
            return false;
        }

        throw error;
    }
}