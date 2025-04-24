import { StoragePort } from "~common/domain/ports/storage";
import { Injectable } from "~common/domain/utils";
import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { Locale } from "~features/i18n/domain/types/Locale";
import type { LocalePersistenceStrategy } from "~features/i18n/domain/types/LocalePersistenceStrategy";

/**
 * Persists the locale in the local storage.
 */
export class LocalStorageLocalePersistenceStrategy extends Injectable implements LocalePersistenceStrategy {

	private readonly storage = this.inject(StoragePort);

	constructor(private readonly config: I18nConfig) {
		super();
	}

	public async persistLocale(locale: Locale): Promise<void> {
		return new Promise((resolve, reject) => {
			const key = this.config.persistenceKey;
			if (key === undefined) {
				return reject(new Error("The persistence key is not set."));
			}
			this.storage.setItem(key, locale.code);
			resolve();
		});
    }

}
