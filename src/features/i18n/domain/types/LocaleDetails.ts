import type { Locale } from "~features/i18n/domain/types/Locale";
import type { TranslationKeys } from "~features/i18n/domain/types/TranslationKeys";

export type LocaleDetails = {
	locale: Locale,
	translations: TranslationKeys
}
