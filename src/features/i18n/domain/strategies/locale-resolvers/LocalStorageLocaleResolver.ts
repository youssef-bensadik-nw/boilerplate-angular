import type { Locale } from "~features/i18n/domain/types/Locale";
import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";

/**
 * Resolves the locale from localStorage
 */
export class LocalStorageLocaleResolver implements LocaleResolver {

	constructor(private readonly config: I18nConfig) {}

	public async getLocale(): Promise<Locale | null> {

		const availableLocalesCodes = this.config.locales.map(locale => locale.code),

		 key = this.config.persistenceKey;
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
