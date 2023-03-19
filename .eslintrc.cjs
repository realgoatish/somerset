module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	rules: {
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,
		'import/no-mutable-exports': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/first': 0,
		'no-use-before-define': 0,
		'no-undef-init': 0,
		'no-underscore-dangle': 0,
		'import/newline-after-import': 0,
		'no-shadow': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'default-case': 0,
		'no-nested-ternary': 0,
		'consistent-return': 0
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
