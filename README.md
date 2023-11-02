# eslint-plugin-svelte-boundaries

Ensures strict boundaries between your .svelte.js/ts and regular JS/TS files.

## 📦 Installation

Using npm:

```bash
# Using npm
npm install eslint-plugin-svelte-boundaries --save-dev

# Using yarn
yarn add eslint-plugin-svelte-boundaries --dev

# Using pnpm
pnpm add -D eslint-plugin-svelte-boundaries

# Using bun
bun add eslint-plugin-svelte-boundaries --dev
```

## 🚀 Usage

Add `eslint-plugin-svelte-boundaries` to the plugins section of your `.eslintrc` configuration file:

```json
{
	"plugins": ["eslint-plugin-svelte-boundaries"]
}
```

Then configure the rules you want to use under the rules section.

### 🔧 Recommended Configuration

This plugin ships with a `recommended` configuration that sets up all the provided rules to their default values:

```json
{
	"extends": ["plugin:svelte-boundaries/recommended"]
}
```

## 📜 Rules

| Rule Name                                                                  | Description                                                                                                                     |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [no-external-svelte-imports](docs/rules/no-external-svelte-imports.md)     | Disallow importing from .svelte.js/ts files outside of .svelte.js/ts files and .svelte files.                                   |
| [no-external-svelte-exports](docs/rules/no-external-svelte-exports.md)     | Disallow exporting directly from .svelte.js/ts files outside of .svelte.js/ts files.                                            |
| [no-external-rune-calls](docs/rules/no-external-rune-calls.md)             | Disallow the usage of $derived(), $effect(), $state(), and $props() in non-Svelte files unless explicitly declared or imported. |
| [no-effect-outside-components](docs/rules/no-effect-outside-components.md) | Disallow usage of the $effect rune outside of .svelte files.                                                                    |
| [no-props-outside-components](docs/rules/no-props-outside-components.md)   | Disallow usage of the $props rune outside of .svelte files.                                                                     |
| [no-direct-rune-assign](docs/rules/no-direct-rune-assign.md)               | Disallow the assignment of Svelte runes as object properties or direct variable assignments.                                    |
| [no-initialized-rune-exports](docs/rules/no-initialized-rune-exports.md)   | Disallow the export of variables or values initialized with a Svelte rune CallExpression.                                       |

## 🤝 Contributions

Contributions to `eslint-plugin-svelte-boundaries` are always welcome!

## 📄 License

`eslint-plugin-svelte-boundaries` is licensed under the [MIT License](./LICENSE).
