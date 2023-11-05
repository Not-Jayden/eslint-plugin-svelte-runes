# Rule Name: `no-initialized-rune-returns`

Disallow directly returning values initialized with `$state` or `$derived` Svelte runes from functions.

## 📜 Rule Details

Directly returning values initialized with Svelte's `$state` or `$derived` from functions will not preserve their reactivity, leading to unexpected behavior. To maintain reactivity when returning these values, use getters and setters in an object.

Examples of **incorrect** code for this rule:

```javascript
function getCount() {
    const count = $state(0);
    return count; 
}
```

Examples of **correct** code for this rule:

```javascript
function getCount() {
    let count = $state(0);
    return {
        get value() {
            return count;
        },
        set value(newValue) {
            count = newValue;
        }
    };
}
```

## ⚙️ Options

This rule does not have any optional settings. Use it as:

```json
"svelte-runes/no-initialized-rune-returns": ["error"]
```

## 🤖 Version

Introduced in eslint-plugin-svelte-runes v0.0.11.
