import type { Locale } from "../types";
import type { LocaleResolver } from "./LocaleResolver";
import { LocaleName } from "../types";
import { availableLocales } from "../available-locales";

/**
 * Resolves the locale from localStorage
 */
export class LocalStorageLocaleResolver implements LocaleResolver {

	public async getLocale(): Promise<Locale | null> {
		const localStorageLocale = localStorage.getItem("i18n-locale");
		if (localStorageLocale === null) {
			return null;
		}
		const parseResult = await LocaleName.safeParseAsync(localStorageLocale);
		if (!parseResult.success) {
			return null;
		}
		const localeName = parseResult.data;
		return availableLocales
			.find(locale => locale.name === localeName)
			?? null;
    }

}
