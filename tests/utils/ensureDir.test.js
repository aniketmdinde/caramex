import {test, suite} from "node:test";
import assert from "node:assert";
import fsp from "fs/promises";
import path from "path";
import os from "os";

import { ensureDir } from "../../utils/ensureDir.js";

suite("ensureDir", () => {
    test("creates directory if it does not exists", async () => {
        const base = await fsp.mkdtemp(path.join(os.tmpdir(), "ensureDir-"));
        const dir = path.join(base, "ensureDir");
        try {
            await ensureDir(dir);
    
            const stats = await fsp.stat(dir);
    
            assert.strictEqual(stats.isDirectory(), true);
        } finally {
            await fsp.rm(dir, { recursive: true, force: true });
        }
    });

    test("does not throw if directory already exists", async () => {
        const prefix = path.join(os.tmpdir(), "ensureDir-");
        const dir = await fsp.mkdtemp(prefix);
        try {
            await ensureDir(dir);
    
            const stats = await fsp.stat(dir);
    
            assert.strictEqual(stats.isDirectory(), true);
        } finally {
            await fsp.rm(dir, { recursive: true, force: true });
        }
    })

    test("creates nested directories", async () => {
        const base = await fsp.mkdtemp(path.join(os.tmpdir(), "ensure-nested-"));
        const nested = path.join(base, "a/b/c");
      
        try {
          await ensureDir(nested);
          const stats = await fsp.stat(nested);
          assert.ok(stats.isDirectory());
        } finally {
          await fsp.rm(base, { recursive: true, force: true });
        }
      });      
})