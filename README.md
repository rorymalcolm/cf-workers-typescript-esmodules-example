# cf-workers-typescript-esmodules-example

## What?

An example of using the new style ESModules syntax for a CF Worker in TypeScript 

## Why?

This is deceptively difficult to do and IMO the current solution is effectively undocumented, key points are that your `package.json`, `*.mts` files, `tsconfig.json` and `wrangler.toml` all need to be configured correctly. 

## Key Components

- All your TS files that are ES Modules have the extension `.mts` instead of `.ts`.

- `package.json` declares the module correctly 
```json
{
  ...
  "type": "module",
  "module": "./dist/index.mjs",
  ...
}
```

- `tsconfig.json` targets some modern output, the `types` section contains the CF workers types, which are also in your `devDependencies`.
```json
{
  ...
  "target": "esnext", 
  "lib": ["esnext"],
  "types": ["@cloudflare/workers-types"],
  ...
}
```

- `wrangler.toml`'s `[build]` and `[build.upload]` is configured correctly, with `main` pointing to the output file, *NOTE* this by default is appended to `.dist/`, this can be overriden with a `dir` file (this is documented deeply within the CF docs), `format` within `[build.upload]` is set to `modules` _NOT_ `service-workers`, `[build]`'s `command` by default is set to use `npm` in most examples, but I changed it to `yarn` to show how you'd do it.

```toml
[build]
command = "yarn install && yarn run build"

[build.upload]
format = "modules"
main = "index.mjs"
```
