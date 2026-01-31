import { select, input, confirm } from "@inquirer/prompts";
import path from "path";
import { logger } from "../utils/logger.js";
import { createConfig } from "../core/createConfig.js"
import { verifyExpressAppInit } from "../core/verifyExpressAppInit.js";
import { createExpressApp } from "../core/createExpressApp.js";

function isKebabCase(name) {
    const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return kebabCaseRegex.test(name);
}

function toKebabCase(name) {
    if(!isKebabCase(name)) {
        name = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[._\s]+/g, '-')
            .toLowerCase()
    }

    return name 
}

export async function init() {
    const ROOT_DIR = process.cwd();
    
    await verifyExpressAppInit(ROOT_DIR);

    const answers = {
        language: null,
        project_name: null
    }
    try {
        answers.language = await select({
            message: "? Which language do you want? (Use arrow keys):",
            choices: [
                {
                    name: "JavaScript",
                    value: "js"
                }
            ],
            default: "js"
        });

        let folderName = path.basename(process.cwd());

        answers.project_name = await input({
            message: "? Project name (Use Kebab Case e.g. my-project):",
            default: toKebabCase(folderName),
            validate: (value) => isKebabCase(value) || "Project name must be kebab-case (e.g. my-project)"
        });

        const config = createConfig(answers);

        logger.info(
            `Configuration summary:\n` +
            `- Language: ${config.language}\n` +
            `- Name: ${config.projectName} \n`
        );
            
        const confirmation = await confirm({
          message: "Proceed with this configuration?",
        });

        if(!confirmation) {
            logger.error("Initialization cancelled.");
            process.exit(1);
        }

        logger.info("Initializing project...")
        await createExpressApp(ROOT_DIR, answers.project_name);

    } catch (error) {
        if(error instanceof Error && error.name === 'ExitPromptError') {
            logger.error("Prompt cancelled by user");
            process.exit(1);
        }
        
        throw error;
    }
}
