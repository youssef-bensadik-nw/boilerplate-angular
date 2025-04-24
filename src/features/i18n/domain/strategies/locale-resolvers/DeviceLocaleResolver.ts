import { DeviceLanguagePort } from "~common/domain/ports/device";
import { Injectable } from "~common/domain/utils";
import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { Locale } from "~features/i18n/domain/types/Locale";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";

/**
 * Resolves the locale from the device language.
 */
export class DeviceLocaleResolver extends Injectable implements LocaleResolver {

	private readonly device = this.inject(DeviceLanguagePort);

	constructor(private readonly config: I18nConfig) {
		super();
	}

	private extractLanguageCode(localeName: string): string | undefined {
		return localeName.split("-").at(0);
	}

	public async getLocale(): Promise<Locale | null> {
		const deviceLocaleName = this.device.getLanguage();
		if (deviceLocaleName === null) {
			return null;
		}
		const languageCode = this.extractLanguageCode(deviceLocaleName);
		if (languageCode === undefined) {
			return null;
		}
		return this.config.locales
			.find(locale => this.extractLanguageCode(locale.code) === languageCode)
			?? null;
    }

}
