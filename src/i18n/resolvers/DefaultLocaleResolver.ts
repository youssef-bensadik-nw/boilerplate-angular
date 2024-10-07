import type { Locale } from "../types";
import type { LocaleResolver } from "./LocaleResolver";
import { defaultLocale } from "../available-locales";

/**
 * Resolves the locale to the default locale.
 */
export class DefaultLocaleResolver implements LocaleResolver {

	public async getLocale(): Promise<Locale> {
        return defaultLocale;
    }
}
