import type { Locale } from "../types";
import type { LocalePersistenceStrategy } from "./LocalePersistenceStrategy";

/**
 * Persists the locale in the local storage.
 */
export class LocalStorageLocalePersistenceStrategy implements LocalePersistenceStrategy {

	public persistLocale(locale: Locale): void {
        localStorage.setItem("i18n-locale", locale.name);
    }

}
