# eslint-plugin-svelte-runes

This plugin intends to provide a collection of rules specifically tailored for enforcing correct and safe usage of Svelte 5 runes.

> 🚧 NOTE: This plugin is still in early development and is subject to breaking changes.

## 🎯 Why This Plugin?

1. Proactive support: Svelte 5 hasn't yet fully landed, but this plugin aims to provide a set of rules that will be ready for enforcing best practices when it does.

1. Safe Universal Reactivity: Focuses on the nuances introduced with Svelte 5 runes, especially with maintaining a safe separation of concerns between Svelte and non-Svelte code in js/ts files.

1. Bridging the Gap: While the official [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte) may take some time to provide support for Svelte 5 and js/ts file, this plugin aims to fill that void.

## 📦 Installation

Using npm:

```bash
# Using npm
npm install eslint-plugin-svelte-runes --save-dev

# Using yarn
yarn add eslint-plugin-svelte-runes --dev

# Using pnpm
pnpm add -D eslint-plugin-svelte-runes

# Using bun
bun add eslint-plugin-svelte-runes --dev
```

## 🚀 Usage

Add `eslint-plugin-svelte-runes` to the plugins section of your `.eslintrc` configuration file:

```json
{
	"plugins": ["eslint-plugin-svelte-runes"]
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

Contributions to `eslint-plugin-svelte-runes` are always welcome!

## 📄 License

`eslint-plugin-svelte-runes` is licensed under the [MIT License](./LICENSE).
