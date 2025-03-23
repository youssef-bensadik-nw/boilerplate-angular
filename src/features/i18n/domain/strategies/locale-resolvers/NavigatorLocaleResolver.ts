import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { Locale } from "~features/i18n/domain/types/Locale";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";

/**
 * Resolves the locale from the navigator's language.
 */
export class NavigatorLocaleResolver implements LocaleResolver {

	constructor(private readonly config: I18nConfig) {}

	private extractLanguageCode(localeName: string): string | undefined {
		return localeName.split("-").at(0);
	}

	public async getLocale(): Promise<Locale | null> {
        const navigatorLocaleName = (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || null;
		if (navigatorLocaleName === null) {
			return null;
		}
		const languageCode = this.extractLanguageCode(navigatorLocaleName);
		if (languageCode === undefined) {
			return null;
		}
		return this.config.locales
			.find(locale => this.extractLanguageCode(locale.code) === languageCode)
			?? null;
    }

}
