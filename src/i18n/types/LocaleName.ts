import { z } from 'zod';

const availableLocaleNames = [
	"en-US",
	"fr-FR",
	"ar-MA"
] as const;

export const LocaleName = z.enum(availableLocaleNames);
export type LocaleName = z.infer<typeof LocaleName>;
