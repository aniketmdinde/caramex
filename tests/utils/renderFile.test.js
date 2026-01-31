import {test, suite} from "node:test";
import assert from "node:assert";
import fsp from "fs/promises";
import path from "path";
import os from "os";

import { renderFile } from "../../utils/renderFile.js";

suite("renderFile", () => {
    test("renders template without variables", async () => {
        const base = await fsp.mkdtemp(path.join(os.tmpdir(), "renderFile-"));
        const templateFile = path.join(base, "template.tpl");
        await fsp.writeFile(templateFile, "hello {{ value }}");

        try {
            const actualContent = await renderFile(templateFile);
            assert.strictEqual(actualContent, "hello ");
        } finally {
            await fsp.rm(base, {recursive: true, force: true});
        }
    });

    test("renders template with variables", async () => {
        const base = await fsp.mkdtemp(path.join(os.tmpdir(), "renderFile-"));
        const templateFile = path.join(base, "template.tpl");
        await fsp.writeFile(templateFile, "hello {{ value }}");

        try {
            const actualContent = await renderFile(templateFile, {value: "world"});
            assert.strictEqual(actualContent, "hello world");
        } finally {
            await fsp.rm(base, {recursive: true, force: true});
        }
    });

    test("throws if template file does not exist", async () => {
        const base = await fsp.mkdtemp(path.join(os.tmpdir(), "renderFile-"));
        const templateFile = path.join(base, "template.tpl");
      
        try {
          await assert.rejects(
            renderFile(templateFile, { value: "world" })
          );
        } finally {
          await fsp.rm(base, { recursive: true, force: true });
        }
      });      
})