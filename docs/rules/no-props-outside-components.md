# Rule Name: `no-props-outside-components`

Disallow the usage of the `$props` rune outside of `.svelte` files.

## 📜 Rule Details

The `$props` rune is only intended to be used to define the props of a Svelte component. Using it outside of a Svelte component, despite being available through the global scope, may lead to unexpected behaviors or issues.

Examples of **incorrect** code for this rule:

```javascript
// File: index.svelte.js

let { value } = $props(); // Incorrect usage of $props outside of a Svelte component
```

Examples of **correct** code for this rule:

```svelte
<!-- File: Component.svelte -->

<script>
    let { value } = $props(); // Correct usage of $props within a Svelte component
</script>
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-props-outside-components": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11.
