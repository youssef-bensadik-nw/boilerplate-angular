import { z } from 'zod';

const availableLocaleNames = [
	"en-US",
	"fr-FR",
	"ar-MA"
] as const;

export const LocaleCode = z.enum(availableLocaleNames);
export type LocaleCode = z.infer<typeof LocaleCode>;
