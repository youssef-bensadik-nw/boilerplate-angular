import type { Locale } from "../types";
import type { LocaleResolver } from "./LocaleResolver";
import { availableLocales } from "../available-locales";

/**
 * Resolves the locale from the navigator's language.
 */
export class NavigatorLocaleResolver implements LocaleResolver {

	private extractLanguageCode(localeName: string): string {
		return localeName.split("-")[0];
	}

	public getLocale(): Locale | null {
        const navigatorLocaleName = (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || null;
		if (navigatorLocaleName === null) {
			return null;
		}
		const languageCode = this.extractLanguageCode(navigatorLocaleName);
		return availableLocales
			.find(locale => this.extractLanguageCode(locale.name) === languageCode)
			?? null;
    }

}
