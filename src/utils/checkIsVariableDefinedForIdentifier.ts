import type { Scope } from 'eslint';
import type { Identifier } from 'estree';

/** Checks if a variable is defined in the scope chain of a given identifier node,
 * and performs an additional check to see if the identifier is actually a reference to the variable.
 */
export function checkIsVariableDefinedForIdentifier({
	initialScope,
	identifierNode,
}: {
	initialScope: Scope.Scope | null;
	identifierNode: Identifier;
}): boolean {
	const name = identifierNode.name;
	let currentScope: Scope.Scope | null = initialScope;

	while (currentScope) {
		const variable = currentScope.variables.find((v) => v.name === name);
		if (!variable) {
			currentScope = currentScope.upper;
			continue;
		}

		const hasReference = variable.references.some((ref) => ref.identifier === identifierNode);
		if (hasReference) {
			return true;
		}

		currentScope = currentScope.upper; // move to the parent scope
	}
	return false;
}
