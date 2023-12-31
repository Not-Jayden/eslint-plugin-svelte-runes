export const EFFECT_RUNE = '$effect';
const STATE_RUNE = '$state';
const DERIVED_RUNE = '$derived';
export const PROPS_RUNE = '$props';

export const RUNE_NAMES = [EFFECT_RUNE, STATE_RUNE, DERIVED_RUNE, PROPS_RUNE] as const;

export const SVELTE_COMPONENT_FILE_EXTENSION = '.svelte';
export const SVELTE_JS_FILE_EXTENSION = '.svelte.js';
export const SVELTE_TS_FILE_EXTENSION = '.svelte.ts';

export const SVELTE_COMPONENT_PATTERN = new RegExp(`${SVELTE_COMPONENT_FILE_EXTENSION}$`, 'i');
export const SVELTE_JS_OR_TS_PATTERN = new RegExp(`(${SVELTE_JS_FILE_EXTENSION}|${SVELTE_TS_FILE_EXTENSION})$`, 'i');

export const SVELTE_FILE_EXTENSIONS = [
	SVELTE_COMPONENT_FILE_EXTENSION,
	SVELTE_JS_FILE_EXTENSION,
	SVELTE_TS_FILE_EXTENSION,
] as const;
