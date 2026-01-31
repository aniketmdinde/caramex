import { Router } from "express";
import { 
    create{{feature | pascalCase}},
    get{{feature | pascalCase}}s,
    get{{feature | pascalCase}},
    update{{feature | pascalCase}},
    delete{{feature | pascalCase}}
} from "../controllers/{{feature | lowercase}}.controller.js";

const router = Router();

router.post("/", create{{feature | pascalCase}});
router.get("/", get{{feature | pascalCase}}s);
router.get("/:id", get{{feature | pascalCase}});
router.put("/:id", update{{feature | pascalCase}});
router.delete("/:id", delete{{feature | pascalCase}});

export default router;
