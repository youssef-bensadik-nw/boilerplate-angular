export function LocaleCodeTemplate({ localeCodes }: Record<string, string>) {
	return `// Generated file. Do not edit it.
import { z } from 'zod';
export const LocaleCode = z.enum([${localeCodes}]);
export type LocaleCode = z.infer<typeof LocaleCode>;
`;
}
