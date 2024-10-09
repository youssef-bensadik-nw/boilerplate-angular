import type { I18nConfig, Locale } from "../types";
import type { LocaleResolver } from "./LocaleResolver";
import { LocaleCode } from "../types";
/**
 * Resolves the locale from localStorage
 */
export class LocalStorageLocaleResolver implements LocaleResolver {

	constructor(private readonly config: I18nConfig) {}

	public async getLocale(): Promise<Locale | null> {

		const key = this.config.persistenceKey;
		if (key === undefined) {
			return null;
		}

		const localStorageLocale = localStorage.getItem(key);
		if (localStorageLocale === null) {
			return null;
		}
		const parseResult = await LocaleCode.safeParseAsync(localStorageLocale);
		if (!parseResult.success) {
			return null;
		}
		const localeCode = parseResult.data;
		return this.config.locales
			.find(locale => locale.code === localeCode)
			?? null;
    }

}
