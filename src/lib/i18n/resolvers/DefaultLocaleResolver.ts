import type {I18nConfig, Locale} from "../types";
import type { LocaleResolver } from "./LocaleResolver";

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
