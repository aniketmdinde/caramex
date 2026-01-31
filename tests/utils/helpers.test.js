import {test, suite} from "node:test";
import assert from "node:assert";
import { helpers } from "../../utils/helpers.js";

suite("helpers", () => {
    test("converts to uppercase", () => {
        assert.strictEqual(helpers.uppercase("hello world"), "HELLO WORLD");
    });

    test("converts to lowercase", () => {
        assert.strictEqual(helpers.lowercase("HELLO WORLD"), "hello world");
    });

    test("converts to camel case", () => {
        assert.strictEqual(helpers.camelCase("hello"), "hello");
        assert.strictEqual(helpers.camelCase("hello world"), "helloWorld");
        assert.strictEqual(helpers.camelCase("hello-world"), "helloWorld");
        assert.strictEqual(helpers.camelCase("hello_world"), "helloWorld");
    });

    test("converts to pascal case", () => {
        assert.strictEqual(helpers.pascalCase("hello world"), "HelloWorld");
        assert.strictEqual(helpers.pascalCase("hello-world"), "HelloWorld");
        assert.strictEqual(helpers.pascalCase("hello_world"), "HelloWorld");
    });

    test("converts to kebab case", () => {
        assert.strictEqual(helpers.kebabCase("hello world"), "hello-world");
        assert.strictEqual(helpers.kebabCase("hello-world"), "hello-world");
        assert.strictEqual(helpers.kebabCase("hello_world"), "hello-world");
        assert.strictEqual(helpers.kebabCase("HelloWorld"), "hello-world");
    });
})