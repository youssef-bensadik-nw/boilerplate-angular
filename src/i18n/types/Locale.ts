import { z } from 'zod';
import { LocaleCode } from "./LocaleCode";
import { LocaleDirection } from "./LocaleDirection";

export const Locale = z.object({
	code: LocaleCode,
	localeSpecificName: z.string().optional(),
	direction: LocaleDirection
}).strict();

export type Locale = z.infer<typeof Locale>;
