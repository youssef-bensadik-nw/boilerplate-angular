import type { LocaleCode } from "~features/i18n/domain/types/LocaleCode";
import type { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";

export type RefinedLocale = {
	code: LocaleCode;
	localeSpecificName?: string;
	direction: LocaleDirection;
}
