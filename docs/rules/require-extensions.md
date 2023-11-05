# Rule Name: `require-extensions`

Require the use of a full `.svelte.js` or `.svelte.ts` file extension for imported files, unless the imported component exists as just `.svelte`.

## 📜 Rule Details

When importing .svelte.js or .svelte.ts files, it is recommended to use the full extension so the compiler can properly recognize the file type, as well as to avoid confusion between .svelte files and .svelte.js/ts files. This rule aims to enforce the use of the full extension when importing .svelte.js/ts files.

Examples of **incorrect** code for this rule:

```html
<script>
    import Component from './Component.svelte'; // incorrect if Component.svelte is a .svelte.js or .svelte.ts file
    import {counterStore} from './counterStore.svelte';
</script>
```

Examples of **correct** code for this rule:

```html
<script>
    import Component from './Component.svelte'; // correct if Component.svelte is a regular .svelte file
    import {counterStore} from './counterStore.svelte.js';
</script>
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/require-extensions": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11.
