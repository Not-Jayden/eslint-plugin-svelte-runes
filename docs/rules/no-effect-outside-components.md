# Rule Name: `no-effect-outside-components`

Disallow the usage of the `$effect` rune outside of `.svelte` files.

## 📜 Rule Details

The `$effect` rune is closely integrated with the lifecycle of Svelte components. When used within a Svelte component, it can effectively react to data changes during the component's lifecycle. However, if used outside a Svelte component, especially when shared between components, it can lead to unintended behaviors due to the tight coupling with the component lifecycle. This rule ensures that `$effect` is used strictly within the context it's designed for, avoiding potential pitfalls and unpredictable results.

Examples of **incorrect** code for this rule:

```javascript
// File: store.svelte.js
$effect(() => console.log(count));
```

Examples of **correct** code for this rule:

<!-- markdownlint-disable -->
```javascript
// File: Counter.svelte
<script>
	import { count } from './store.svelte.js';
	
	$effect(() => console.log(count));
</script>
```
<!-- markdownlint-enable -->

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-effect-outside-components": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11
