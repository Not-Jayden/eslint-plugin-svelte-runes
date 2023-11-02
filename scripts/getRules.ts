import { rules } from '../src';

function getRules() {
	const ruleStrings = Object.entries(rules).map(([name, rule]) => {
		return `${name}: ${rule.meta?.docs?.description}`;
	});

	return ruleStrings.join('\n');
}

console.log(getRules());
