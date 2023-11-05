# Rule Name: `no-initialized-rune-exports`

Disallow the direct export of variables or values initialized with `$state` or `$derived` Svelte runes.

## 📜 Rule Details

Directly exporting values initialized with Svelte's `$state` or `$derived` will not be reactive, resulting in unexpected behavior. To preserve reactivity when exporting, use getters and setters in an object.

Examples of **incorrect** code for this rule:

```javascript
// File: store.svelte.js
export const count = $state(...);
const double = $derived(...);
```

Examples of **correct** code for this rule:

```javascript
// File: store.svelte.js

let count = $state(0);
const double = $derived(count * 2);

export function counterStore() {
    return {
        get count() {
            return count;
        },
        set count(value) {
            count = value;
        },
        get double() {
            return double;
       }
    };
};
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-external-svelte-imports": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11
