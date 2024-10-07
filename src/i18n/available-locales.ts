import type { Locale } from "./types";

export const defaultLocale: Locale = {
	name: "en-US",
	direction: "ltr"
};

export const availableLocales: Locale[] = [
	defaultLocale,
	{
		name: "fr-FR",
		direction: "ltr"
	},
	{
		name: "ar-MA",
		direction: "rtl"
	}
];
