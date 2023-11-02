import { Rule } from 'eslint';

export function getPropertyValueIdentifier(node: Extract<Rule.Node, { type: 'Property' }>) {
	if (node.shorthand && node.key.type === 'Identifier') {
		return node.key;
	}

	if (node.value.type === 'Identifier') {
		return node.value;
	}

	return null;
}
