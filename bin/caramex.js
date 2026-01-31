#!/usr/bin/env node

import { init } from "../commands/init.js";
import { add } from "../commands/add.js";

function printHelp() {
    console.log(`
caramex — Minimal project scaffolding tool

Usage:
  caramex init
  caramex add <feature>

Commands:
  init        Initialize a new project
  add         Add a feature

Examples:
  caramex init
  caramex add auth
`);
}

const command = process.argv[2];

if(!command || command === "help") {
    printHelp();
    process.exit(0);
}

switch(command) {
    case "init": {
        await init();
        break;
    }

    case "add": {
        if(!process.argv[3]) {
            console.error("Missing argument 'feature_name' for add command");
            printHelp();
            process.exit(1);
        }
        

        const flags = process.argv.slice(4);

        const allowedFlags = [
            "--force",
            "--dry-run",
            "--crud",
            "--service",
            "--middleware"
        ];
          
        const unknownFlags = flags.filter(f => !allowedFlags.includes(f));
          
        if (unknownFlags.length) {
            console.error("❌ Unknown flags:", unknownFlags.join(", "));
            process.exit(1);
        }

        const options = {
            overwrite: flags.includes("--force"),
            preview: flags.includes("--dry-run"),
            crud: flags.includes("--crud"),
            service: flags.includes("--service"),
            middleware: flags.includes("--middleware")
        }

        try {
            await add(process.argv[3], options);
        } catch (err) {
            console.error("❌", err.message);
            process.exit(1);
        }          
        
        break;
    }

    default: {
        console.error("Unknown command:", process.argv[2]);
        printHelp();
        process.exit(1);
    }
}
    