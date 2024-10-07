import { z } from 'zod';
import { LocaleName } from "./LocaleName";
import { LocaleDirection } from "./LocaleDirection";

export const Locale = z.object({
	name: LocaleName,
	direction: LocaleDirection
}).strict();

export type Locale = z.infer<typeof Locale>;
