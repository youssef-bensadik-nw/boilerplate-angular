import type { Locale } from "~features/i18n/domain/types/Locale";

export interface LocalePersistenceStrategy {

	/**
	 * Persists the locale.
	 */
	persistLocale(locale: Locale): Promise<void>;
}
