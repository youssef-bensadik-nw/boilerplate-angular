import type { I18nConfig, Locale } from "../types";
import type { LocalePersistenceStrategy } from "./LocalePersistenceStrategy";

/**
 * Persists the locale in the local storage.
 */
export class LocalStorageLocalePersistenceStrategy implements LocalePersistenceStrategy {

	constructor(private readonly config: I18nConfig) {}

	public persistLocale(locale: Locale): void {
		const key = this.config.persistenceKey;
		if (key === undefined) {
			throw new Error("The persistence key is not set.");
		}
        localStorage.setItem(key, locale.code);
    }

}
