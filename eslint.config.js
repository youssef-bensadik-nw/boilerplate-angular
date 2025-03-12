// @ts-check
const eslint = require("@eslint/js");
const tsEslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tsEslint.config(
	{
		files: ["**/*.ts"],
		extends: [
			eslint.configs.recommended,
			...tsEslint.configs.strict,
			...tsEslint.configs.stylistic,
			...angular.configs.tsAll,
		],
		processor: angular.processInlineTemplates,
		rules: {
			"@angular-eslint/directive-selector": [
				"error",
				{
					type: "attribute",
					prefix: "nw",
					style: "camelCase",
				},
			],
			"@angular-eslint/component-selector": [
				"error",
				{
					type: "element",
					prefix: "nw",
					style: "kebab-case",
				},
			],
			"@typescript-eslint/no-extraneous-class": [
				"error",
				{
					"allowWithDecorator": true
				}
			]
		},
	},
	{
		files: ["**/*.html"],
		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
		],
		rules: {},
	}
);
