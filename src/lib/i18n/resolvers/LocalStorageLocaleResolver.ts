import type { I18nConfig, Locale } from "../types";
import type { LocaleResolver } from "./LocaleResolver";

/**
 * Resolves the locale from localStorage
 */
export class LocalStorageLocaleResolver implements LocaleResolver {

	constructor(private readonly config: I18nConfig) {}

	public async getLocale(): Promise<Locale | null> {

		const availableLocalesCodes = this.config.locales.map(locale => locale.code);

		const key = this.config.persistenceKey;
		if (key === undefined) {
			return null;
		}

		const localStorageLocaleCode = localStorage.getItem(key);
		if (localStorageLocaleCode === null) {
			return null;
		}
		const localeCodeExists = availableLocalesCodes.includes(localStorageLocaleCode);
		if (!localeCodeExists) {
			return null;
		}
		return this.config.locales
			.find(locale => locale.code === localStorageLocaleCode)
			?? null;
    }

}
