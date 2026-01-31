import path from "path";
import { fileURLToPath } from "url";
import { exists } from "../utils/exists.js";
import {renderFile} from "../utils/renderFile.js";
import {writeFile} from "../utils/writeFile.js"
import { helpers } from "../utils/helpers.js";
import { logger } from "../utils/logger.js";
import { registerRoute } from "../core/registerRoute.js";

function getFeaturePaths(routesFolderPath, controllersFolderPath, feature) {
    const name = helpers.lowercase(feature);
    return {
        routesFilePath: path.join(routesFolderPath, `${name}.routes.js`),
        controllersFilePath: path.join(controllersFolderPath, `${name}.controller.js`)
    };
}

export async function add(feature, {overwrite, preview, crud, service, middleware = false} = {}) {
    
    // checking if feature is in Camel case or Pascal case
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(feature)) {
        throw new Error("Feature name must be camelCase or PascalCase (no spaces)");
    }
    

    // getting the directory name where the command is being run
    const folderName = process.cwd();

    const routesFolderPath = path.join(folderName, "src/routes");
    const controllersFolderPath = path.join(folderName, "src/controllers");


    // check and create routes and controllers file
    if(!await exists(routesFolderPath) || !await exists(controllersFolderPath)) {
        throw new Error(`src/routes or src/controllers folder does not exist`);
    }

    if(!crud && service) {
        throw new Error(
            "--service requires --crud\n" +
            "⚠ --service is not implemented yet and will be ignored"
        );
    }

    if (middleware) {
        logger.warn("--middleware is not implemented yet and will be ignored");
    }


    // getting templates from this package
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const routesTemplatePath = crud ? 
        path.join(__dirname, "../templates/routes.crud.tpl") : path.join(__dirname, "../templates/routes.basic.tpl");

    const controllersTemplatePath = crud ? 
        path.join(__dirname, "../templates/controllers.crud.tpl") : path.join(__dirname, "../templates/controllers.basic.tpl");

    const routesContent = await renderFile(routesTemplatePath, {feature});
    const controllersContent = await renderFile(controllersTemplatePath, {feature});

    const {routesFilePath, controllersFilePath } = getFeaturePaths(routesFolderPath, controllersFolderPath, feature);

    const routeExists = await exists(routesFilePath);
    const controllerExists = await exists(controllersFilePath);

    if (preview) {
        logger.info("DRY RUN — no files will be created");
        logger.success(`Would create src/routes/${helpers.lowercase(feature)}.routes.js`);
        logger.success(`Would create src/controllers/${helpers.lowercase(feature)}.controller.js`);
        logger.success(`Would create Registered and connected authRoutes in src/app.js`);
        return;
    }

    if ((routeExists || controllerExists) && !overwrite) {
        throw new Error(
            `Feature "${helpers.lowercase(feature)}" is already registered — skipping\n` +
            `Use --force to overwrite or --dry-run to preview changes.`
        );
    }

    logger.info(`Adding feature: ${feature}`);

    await writeFile(routesFilePath, routesContent, { overwrite });
    logger.success(`src/routes/${helpers.lowercase(feature)}.routes.js`);

    await writeFile(controllersFilePath, controllersContent, { overwrite });
    logger.success(`src/controllers/${helpers.lowercase(feature)}.controller.js`);

    await registerRoute(feature);

    logger.success(`Feature "${feature}" added`)
}