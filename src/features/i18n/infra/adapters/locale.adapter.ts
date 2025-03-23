import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { type Observable, map } from "rxjs";
import { LoggerPort } from "~common/domain/ports/logger.port";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";
import { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { Locale } from "~features/i18n/domain/types/Locale";
import { LocaleDetails } from "~features/i18n/domain/types/LocaleDetails";

@Injectable()
export class LocaleAdapter implements LocalePort {

	constructor(
		private readonly logger: LoggerPort,
		private readonly service: TranslateService,
		private readonly i18nConfigUseCase: I18nConfigUseCase,
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
		this.i18nConfig = this.i18nConfigUseCase.handle();
	}

	public readonly currentLocale$: Observable<LocaleDetails | undefined>;
	private readonly i18nConfig: I18nConfig;

	private getLocaleObject(locale: string) {
		const localeObject = this.i18nConfig.locales.find((l) => l.code === locale);
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
