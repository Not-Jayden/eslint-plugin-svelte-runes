import { existsSync } from 'fs';
import { dirname, resolve } from 'path';

/**
 * Get the absolute path of the imported module, including the file extension.
 */
export function getImportSource({ source, fileName }: { source: string; fileName: string }): string {
	const basePath = dirname(fileName);
	const importedModulePath = resolve(basePath, source);

	// If it's an absolute or relative path, perform the custom logic
	if (source.startsWith('./') || source.startsWith('../') || source.startsWith('/')) {
		if (existsSync(importedModulePath)) {
			return importedModulePath;
		}

		if (existsSync(importedModulePath + '.js')) {
			return importedModulePath + '.js';
		}

		if (existsSync(importedModulePath + '.ts')) {
			return importedModulePath + '.ts';
		}

		return importedModulePath;
	}

	// For modules in node_modules or node's resolution logic
	try {
		return require.resolve(source, {
			paths: [basePath],
		});
	} catch (e) {
		// If not found, return the original path
		return importedModulePath;
	}
}
