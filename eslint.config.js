import globals from 'globals';

export default [
	{ languageOptions: { globals: globals.browser } },
	{
		rules: {
			'brace-style': ['error', '1tbs'],
			'no-inner-declarations': ['off'],
			'linebreak-style': ['error', 'windows'],
			semi: ['error', 'always'],
			'semi-spacing': ['error', { before: false, after: true }],
			'max-len': ['error', { code: 180 }],
			indent: ['error', 'tab', {
				SwitchCase: 1,
				ignoredNodes: ['TemplateLiteral > *'],
			}],
			'no-redeclare': ['error'],
			'no-empty': ['off'],
			'operator-linebreak': ['error', 'before'],
			'no-nested-ternary': ['error'],
			curly: ['error', 'all'],
			'space-before-function-paren': ['error', 'always'],
			'keyword-spacing': ['error', { before: true, after: true }],
			'no-extra-parens': ['off'],
			'comma-dangle': ['error', {
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'never',
				exports: 'never',
				functions: 'never',
			}],
			'comma-spacing': ['error', { before: false, after: true }],
			'space-infix-ops': ['error'],
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'no-case-declarations': ['off'],
			'no-unused-vars': ['error', { args: 'none' }],
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'no-trailing-spaces': ['error'],
			'no-unreachable': ['warn'],
			'object-curly-spacing': ['error', 'always'],
			'quote-props': ['error', 'as-needed'],
			'padded-blocks': ['error', 'never'],
			'no-ex-assign': ['off'],
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
			'space-before-blocks': ['error', 'always'],
			'no-control-regex': ['off'],
			'no-prototype-builtins': ['off'],
			'no-self-assign': ['off'],
			'no-useless-catch': ['off'],
			'no-func-assign': ['off'],
		},
	},
];