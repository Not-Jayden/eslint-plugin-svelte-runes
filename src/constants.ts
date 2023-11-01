const effectRuneName = "$effect";
const stateRuneName = "$state";
const derivedRuneName = "$derived";
const propsRuneName = "$props";

const svelteComponentFileExtension = ".svelte";
export const svelteJsFileExtension = ".svelte.js";
export const svelteTsFileExtension = ".svelte.ts";

export const svelteFileExtensions = [
  svelteComponentFileExtension,
  svelteJsFileExtension,
  svelteTsFileExtension,
] as const;

export const runeNames = [
  effectRuneName,
  stateRuneName,
  derivedRuneName,
  propsRuneName,
] as const;
