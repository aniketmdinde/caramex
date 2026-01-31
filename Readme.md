# caramex

A developer-friendly CLI to initialize Express projects and generate feature-based routes & controllers with zero boilerplate friction.

## Why caramex?
Setting up and scaling an Express project usually means:
- Manually creating folders
- Writing repetitive boilerplate
- Wiring routes into app.js every time
- Accidentally breaking imports or registrations

caramex automates all of that safely, predictably, and idempotently.

## Features

- Project Initialization
    - Creates a clean Express project structure
    - Installs required dependencies
    - Configures scripts and module type
    - Enforces a predictable `src/` layout
- Feature Generation
    - Generates routes & controllers per feature
    - Automatically registers routes in app.js
    - Supports basic and CRUD templates
    - Safe file writing (no accidental overwrites)

## Generated Project Structure
```
src/
├── app.js
├── index.js
├── routes/
│   └── auth.routes.js
└── controllers/
    └── auth.controller.js
```

## Installation
### Global install
```
npm install -g caramex
```


OR
### Using npx
```
npx caramex init
```

## Commands

### `caramex init`
Initializes a new Express project in the current directory.


What it does:
- Runs npm init
- Installs express
- Installs nodemon (dev dependency)
- Sets type: module
- Sets entry point to src/index.js
- Creates base folder structure

Usage:
```
caramex init
```

### `caramex add <feature>`
Generates a feature with routes and controllers and wires it into the app.

Usage:
```
caramex add auth
```

#### Generated files
```
src/routes/auth.routes.js
src/controllers/auth.controller.js
```

### Automatically updates
```
// src/app.js
import authRoutes from "./routes/auth.routes.js";

app.use("/auth", authRoutes);
```

## Options:
### `--crud`
Generate CRUD boilerplate instead of a basic template.
```
caramex add users --crud
```

### `--force`
Overwrite existing files if they already exist.
```
caramex add auth --force
```
### `--preview`
Dry-run mode. Shows what will be created without touching the filesystem.
```
caramex add auth --preview
```

## Future Plans
The following will be achieved as the package get better:
- Completing unit testing of all file and moving towards integration testing
- adding service files if needed using service flag
- adding middleware files if needed using middleware flag
- adding `typescript` language support

## Final Thoughts
`caramex` is built as a learning-first, production-ready CLI designed to create clean Express structure while saving real development time.

If you enjoy building tools instead of rewriting boilerplate, this is for you.


## License
MIT © Aniket Dinde
