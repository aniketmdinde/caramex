import { Router } from "express";
import { test{{feature | pascalCase}} } from "../controllers/{{feature | lowercase}}.controller.js";

const router = Router();

router.get("/test", test{{feature | pascalCase}});

export default router;