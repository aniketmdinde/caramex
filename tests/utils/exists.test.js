import {suite, test} from "node:test";
import assert from "node:assert";
import fsp from "fs/promises";
import os from "os";
import path from "path";

import { exists } from "../../utils/exists.js";

suite("exists", () => {
    suite("exists", () => {
        test("returns true for existing directory", async () => {
          const prefix = path.join(os.tmpdir(), "exists-dir-");
          const dir = await fsp.mkdtemp(prefix);
      
          try {
            assert.strictEqual(await exists(dir), true);
          } finally {
            await fsp.rm(dir, { recursive: true, force: true });
          }
        });
      
        test("returns true for existing file", async () => {
          const file = path.join(os.tmpdir(), "exists-file.txt");
      
          try {
            await fsp.writeFile(file, "hello");
            assert.strictEqual(await exists(file), true);
          } finally {
            await fsp.rm(file, { force: true });
          }
        });
      
        test("returns false for non-existing path", async () => {
          const file = path.join(os.tmpdir(), "does-not-exist.txt");
          assert.strictEqual(await exists(file), false);
        });
      });
})