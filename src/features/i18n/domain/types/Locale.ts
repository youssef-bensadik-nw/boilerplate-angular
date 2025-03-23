import type { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";

export type Locale = {
	code: string,
	localeSpecificName?: string,
	direction?: LocaleDirection
};

