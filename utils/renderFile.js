import fsp from "fs/promises";
import { render } from "./render.js";
import { helpers } from "./helpers.js";

export async function renderFile(templatePath, data = {}, customHelpers = helpers) {
    try {        
        const content = await fsp.readFile(templatePath, {encoding: "utf-8"});
        return render(content, data, customHelpers);
    } catch (error) {
        if(error.code === "ENOENT") {
            throw new Error(`Template not found: ${templatePath}`);
        }

        throw error;   
    }
}