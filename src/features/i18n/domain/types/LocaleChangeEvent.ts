import type { RefinedLocale } from "~features/i18n/domain/types/RefinedLocale";
import type { TranslationKeys } from "~features/i18n/domain/types/TranslationKeys";

export interface LocaleChangeEvent {
	locale: RefinedLocale;
	translations: TranslationKeys;
}
