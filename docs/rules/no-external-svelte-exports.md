# Rule Name: `no-external-svelte-export`

Disallow exporting directly from `.svelte.js/ts` files outside of `.svelte.js/ts` files.

## 📜 Rule Details

This rule prevents exporting directly from `.svelte.js` or `.svelte.ts` files unless you are within a `.svelte.js/ts` file. Directly exporting from Svelte compiled files in other contexts may lead to unexpected behaviors or issues.

Examples of **incorrect** code for this rule:

```javascript
// File: index.js
export { store } from './store.svelte.js';
```

```javascript
// File: index.js
export * from './store.svelte.js';
```

Examples of **correct** code for this rule:

```javascript
// File: index.svelte.js
export { store } from './store.svelte.js';
```

```javascript
// File: index.svelte.js
export * from './store.svelte.js';
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-external-svelte-export": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11
