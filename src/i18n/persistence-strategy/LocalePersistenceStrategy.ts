import { Locale } from "../types";

export interface LocalePersistenceStrategy {

	/**
	 * Persists the locale.
	 */
	persistLocale(locale: Locale): void;
}
