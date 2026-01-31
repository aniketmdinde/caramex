import {test, suite} from "node:test";
import assert from "node:assert";
import fsp from "fs/promises";
import path from "path";
import os from "os";

import { writeFile } from "../../utils/writeFile.js";

suite("writeFile", () => {
    test("writes to a non-existing file", async () => {
        const base =  await fsp.mkdtemp(path.join(os.tmpdir(), "writeFile-"));
        const filePath = path.join(base, "writeFile.txt");

        try {
            const expectedContent = "Hello World";
            await writeFile(filePath, expectedContent);

            const stats = await fsp.stat(filePath);

            assert.strictEqual(stats.isFile(), true)
        } finally {
            await fsp.rm(base, {recursive: true, force: true});
        }
    });

    test("overwrites an existing file when overwrite flag is set", async () => {
        const base =  await fsp.mkdtemp(path.join(os.tmpdir(), "writeFile-"));
        const filePath = path.join(base, "writeFile.txt");
        await fsp.writeFile(filePath, "hello")

        try {
            const expectedContent = "Hello World";
            await writeFile(filePath, expectedContent , {overwrite: true});

            const stats = await fsp.stat(filePath);
            assert.strictEqual(stats.isFile(), true)

            const content = await fsp.readFile(filePath);
            assert.strictEqual(content.toString(), expectedContent);
        } finally {
            await fsp.rm(base, {recursive: true, force: true});
        }
    });

    test("throws while writing to an existsing file without overwrite flag", async () => {
        const base =  await fsp.mkdtemp(path.join(os.tmpdir(), "writeFile-"));
        const filePath = path.join(base, "writeFile.txt");
        await fsp.writeFile(filePath, "hello")

        try {
            const expectedContent = "Hello World";
            await assert.rejects(
                writeFile(filePath, expectedContent)
            );
        } finally {
            await fsp.rm(base, {recursive: true, force: true});
        }
    })
})