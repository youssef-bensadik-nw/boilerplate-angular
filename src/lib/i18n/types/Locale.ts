import { z } from 'zod';
import { LocaleDirection } from "./LocaleDirection";

export const Locale = z.object({
	code: z.string(),
	localeSpecificName: z.string().optional(),
	direction: LocaleDirection
}).strict();

export type Locale = z.infer<typeof Locale>;

