import type { Locale } from "~features/i18n/domain/types/Locale";

export interface LocaleResolver {
	/**
	 * Returns the user's resolved locale or null if the user locale could not be resolved.
	 */
	getLocale(): Promise<Locale | null>;
}
