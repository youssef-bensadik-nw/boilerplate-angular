import type { I18nConfig, Locale } from "../types";
import type { LocalePersistenceStrategy } from "./LocalePersistenceStrategy";

/**
 * Persists the locale in the local storage.
 */
export class LocalStorageLocalePersistenceStrategy implements LocalePersistenceStrategy {

	constructor(private readonly config: I18nConfig) {}

	public async persistLocale(locale: Locale): Promise<void> {
		return new Promise((resolve, reject) => {
			const key = this.config.persistenceKey;
			if (key === undefined) {
				return reject(new Error("The persistence key is not set."));
			}
			localStorage.setItem(key, locale.code);
			resolve();
		});
    }

}
