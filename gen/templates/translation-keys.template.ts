export function TranslationKeysTemplate({
	translationFilesImports,
	translationTypesList,
	translationTypesUnion
}: Record<string, string>) {
	return `// Generated file. Do not edit it.

${translationFilesImports}

${translationTypesList}

export type TranslationKeys = ${translationTypesUnion};

`;
}
