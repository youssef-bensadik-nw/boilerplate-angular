import type { Locale } from "~features/i18n/domain/types/Locale";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";
import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";

/**
 * Resolves the locale to the default locale.
 */
export class DefaultLocaleResolver implements LocaleResolver {

    constructor(private readonly config: I18nConfig) {}

	public async getLocale(): Promise<Locale> {
        const locale = this.config.locales.at(0);
        if (!locale) {
            throw new Error("No default locale provided.");
        }
        return locale;
    }
}
