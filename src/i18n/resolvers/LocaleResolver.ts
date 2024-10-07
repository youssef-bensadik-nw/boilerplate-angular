import type { Locale } from "../types";

export interface LocaleResolver {
	/**
	 * Returns the user's resolved locale or null if the user locale could not be resolved.
	 */
	getLocale(): Locale | null;
}
