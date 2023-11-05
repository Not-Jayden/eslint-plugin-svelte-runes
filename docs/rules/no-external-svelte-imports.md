# Rule Name: `no-external-svelte-imports`

Disallow importing from `.svelte.js/ts` files outside of `.svelte.js/ts` files and `.svelte` files.

## 📜 Rule Details

This rule prevents any importing from '.svelte.js' or '.svelte.ts' files outside of other '.svelte.js/ts' files or '.svelte' files, as importing from Svelte compiled files may cause unexpected issues.

Examples of **incorrect** code for this rule:

```javascript
// File: index.js
import { store } from './store.svelte.js';
```

```javascript
// File: index.js
const store = await import('./store.svelte.js');
```

Examples of **correct** code for this rule:

```javascript
// File: index.svelte.js
import { store } from './store.svelte.js';
```

```javascript
// File: index.svelte.js
const store = await import('./store.svelte.js');
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-external-svelte-imports": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11
