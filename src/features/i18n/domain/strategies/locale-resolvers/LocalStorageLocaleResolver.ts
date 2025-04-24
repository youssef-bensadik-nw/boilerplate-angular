import type { Locale } from "~features/i18n/domain/types/Locale";
import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";
import { Injectable } from "~common/domain/utils";
import { StoragePort } from "~common/domain/ports/storage";

/**
 * Resolves the locale from localStorage
 */
export class LocalStorageLocaleResolver extends Injectable implements LocaleResolver {

	private readonly storage = this.inject(StoragePort);

	constructor(private readonly config: I18nConfig) {
		super();
	}

	public async getLocale(): Promise<Locale | null> {

		const availableLocalesCodes = this.config.locales.map(locale => locale.code),

		 key = this.config.persistenceKey;
		if (key === undefined) {
			return null;
		}

		const localStorageLocaleCode = this.storage.getItem(key);
		if (!localStorageLocaleCode) {
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
