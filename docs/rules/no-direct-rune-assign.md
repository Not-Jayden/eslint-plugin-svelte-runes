# Rule Name: `no-direct-rune-assign`

Disallow the assignment of Svelte runes as object properties or direct variable assignments, as the compiler will not be able to process them.

## 📜 Rule Details

This rule aims to prevent the assignment of Svelte runes directly as object properties or as variables. This is crucial because the Svelte compiler will not be able to recognize and process these runes if they're assigned without proper invocation.

Examples of **incorrect** code for this rule:

```javascript
// Direct assignment of Svelte rune to a variable
const state = $state;

// Assigning a Svelte rune as a property in an object
const obj = {
	$state,
};
```

Examples of **correct** code for this rule:

```javascript
const obj = {
	$state: 'not a rune',
};
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-direct-rune-assign": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11
