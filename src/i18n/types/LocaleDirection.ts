import { z } from "zod";

export const LocaleDirection = z.enum([
	"ltr",
	"rtl",
]);

export type LocaleDirection = z.infer<typeof LocaleDirection>;
