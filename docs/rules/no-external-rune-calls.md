# Rule Name: `no-external-rune-calls`

Disallow the usage of Svelte rune function calls like `$derived()`, `$effect()`, `$state()`, and `$props()` in non-Svelte files unless they are explicitly declared or imported.

## 📜 Rule Details

Svelte runes are compiler hints that are only recognized by the Svelte compiler. Even though their types are declared globally, using them in non-Svelte files will lead to unexpected errors. This rule aims to prevent the usage of Svelte runes in non-Svelte files unless they are explicitly declared or imported.

Examples of **incorrect** code for this rule:

```javascript
// File: helper.js
const state = $state(0);  // Incorrect if $state is not declared or imported in this file
```

Examples of **correct** code for this rule:

```javascript
// File: Counter.svelte
<script>
  const state = $state(0);  // Correct usage within a Svelte component
</script>
```

```javascript
// File: helper.js
import { $state } from 'svelte/store';
const state = $state();  // Correct if $state is explicitly imported
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-external-rune-calls": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11
