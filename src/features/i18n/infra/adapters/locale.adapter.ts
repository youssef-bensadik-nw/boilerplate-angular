import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { type Observable, map } from "rxjs";
import { LoggerPort } from "~common/domain/ports/logger";
import { i18nConfig } from "~features/i18n/domain/i18n.config";
import { LocalePort } from "~features/i18n/domain/ports/locale";
import type { Locale } from "~features/i18n/domain/types/Locale";
import { LocaleDetails } from "~features/i18n/domain/types/LocaleDetails";

@Injectable()
export class LocaleAdapter implements LocalePort {

	constructor(
		private readonly logger: LoggerPort,
		private readonly service: TranslateService,
	) {
		this.currentLocale$ = this.service.onLangChange.asObservable()
			.pipe(map(({ lang, translations }) => {
				const locale = this.getLocaleObject(lang);
				if (!locale) return undefined;
				return {
					locale,
					translations
				};
			}));
	}

	public readonly currentLocale$: Observable<LocaleDetails | undefined>;

	private getLocaleObject(locale: string) {
		const localeObject = i18nConfig.locales.find((l) => l.code === locale);
		if (!localeObject) {
			this.logger.error(`Locale "${locale}" not found.`);
			return undefined;
		}
		return localeObject;
	}

	public setCurrent(locale: Locale): void {
		if (this.service.currentLang === locale.code) {
			this.logger.warn(`Locale "${locale.code}" is already in use.`);
			return;
		}
		this.logger.info(`Using locale "${locale.code}".`);
		if (!this.getLocaleObject(locale.code)) {
			return;
		}
		this.service.use(locale.code);
	}

}
