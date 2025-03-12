export function LocaleCodeTemplate({ localeCodes }: Record<string, string>) {
	return `// Generated file. Do not edit it.

export type LocaleCode = ${localeCodes};
`;
}
