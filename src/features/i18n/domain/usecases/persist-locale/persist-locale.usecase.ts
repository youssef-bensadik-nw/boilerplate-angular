import { Injectable } from "~common/domain/utils/Injectable";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import { filter, from, map, Observable, switchMap } from "rxjs";
import { Locale } from "~features/i18n/domain/types/Locale";
import { createPersistenceStrategy } from "~features/i18n/domain/strategies/persistence-strategies";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";
import { LoggerPort } from "~common/domain/ports/logger.port";

export class PersistLocaleUseCase extends Injectable {

	private readonly logger = this.inject(LoggerPort);
	private readonly locale = this.inject(LocalePort);
	private readonly i18nConfig = this.inject(I18nConfigUseCase).handle();

	private async persist(locale: Locale) {
		if (!locale) {
			return;
		}
		const strategy = createPersistenceStrategy(this.i18nConfig.localeChangePersistenceStrategy, this.i18nConfig);
		this.logger.debug(`Persisting locale "${locale.code} according to strategy "${strategy.constructor.name}".`);
		await strategy.persistLocale(locale);
	}

	public handle(): Observable<void> {
		return this.locale.currentLocale$
            .pipe(filter(Boolean))
            .pipe(map(({ locale }) => locale))
            .pipe(switchMap((locale) => from(this.persist(locale))));
	}

}
