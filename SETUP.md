# Setup

This is a setup for the CLI tool. If you're looking for setting up the base template, please refer to the template's `SETUP.md`.

- [ ] Run `npm i --force` to install dependencies.
  - You don't have to `--force` install, but the template needs it so better to add it in practice.
- [ ] NPM Scripts
  - `start`: Start in production mode.
  - `pretty`: Run `prettier` across the entire CLI tool and template code.
  - `build`: Use `tsup` to roll up the entire CLI tool into one file and build. Handy later when this project is rewritten in TypeScript.
  - `release`: Run `build` and release package on NPM.
  - `update`: Run all `update:*` commands.
  - `update:template`: Update template's `package.json`.
  - `update:base`: Update CLI tool's `package.json`.
