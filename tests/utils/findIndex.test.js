import {suite, test} from "node:test";
import assert from "node:assert";

import {findAnchorIndex, findLastImportIndex} from "../../utils/findIndex.js";

suite("findIndex", () => {
    test("findAnchorIndex :: return anchor index for existing anchor", () => {
        const lines = ["x", "y", "  my anchor  ", "z"];
        const anchor = "my anchor"

        assert.strictEqual(findAnchorIndex(lines, anchor), 2);
    });

    test("findAnchorIndex :: return -1 for non-existing anchor", () => {
        const lines = ["x", "y", "my anchor", "z"];
        const anchor = "different anchor"

        assert.strictEqual(findAnchorIndex(lines, anchor), -1);
    });

    test("findLastImportIndex :: return last import index for existing import", () => {
        const lines = [
            "import a",
            "important note",
            "import b",
            "const x = 1"
          ];

        assert.strictEqual(findLastImportIndex(lines), 2);
    });

    test("findLastImportIndex :: return -1 for non-existing import", () => {
        const lines = ["x", "y", "impr xyz", "z"];

        assert.strictEqual(findLastImportIndex(lines), -1);
    });
})