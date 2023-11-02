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
	"extends": ["plugin:eslint-plugin-svelte-boundaries/recommended"]
}
```

## 📜 Rules

### no-restricted-svelte-imports

Disallow importing from `.svelte.js/ts` files outside of `.svelte.js/ts` files and `.svelte` files.

-   **Problematic patterns**:

    ```javascript
    import something from 'component.svelte.js';
    ```

    In a non-`.svelte.js/ts` and non-`.svelte` file.

-   **Passing patterns**:

    ```javascript
    import something from 'component.svelte.js';
    ```

    In a `.svelte.js/ts` or `.svelte` file.

### no-restricted-svelte-exports

Disallow exporting directly from `.svelte.js/ts` files outside of `.svelte.js/ts` files.

-   **Problematic patterns**:

    ```javascript
    export { something } from 'component.svelte.js';
    ```

    In a non-`.svelte.js/ts` file.

-   **Passing patterns**:

    ```javascript
    export { something } from 'component.svelte.js';
    ```

    In a `.svelte.js/ts` file.

## 📄 License

`eslint-plugin-svelte-boundaries` is licensed under the [MIT License](./LICENSE).
