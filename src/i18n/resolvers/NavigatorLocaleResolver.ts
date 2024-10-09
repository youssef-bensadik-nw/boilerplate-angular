import type {I18nConfig, Locale} from "../types";
import type { LocaleResolver } from "./LocaleResolver";

/**
 * Resolves the locale from the navigator's language.
 */
export class NavigatorLocaleResolver implements LocaleResolver {

	constructor(private readonly config: I18nConfig) {}

	private extractLanguageCode(localeName: string): string {
		return localeName.split("-")[0];
	}

	public async getLocale(): Promise<Locale | null> {
        const navigatorLocaleName = (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || null;
		if (navigatorLocaleName === null) {
			return null;
		}
		const languageCode = this.extractLanguageCode(navigatorLocaleName);
		return this.config.locales
			.find(locale => this.extractLanguageCode(locale.code) === languageCode)
			?? null;
    }

}
