import { TranslateService } from "@ngx-translate/core";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import { Locale } from "~features/i18n/domain/types/Locale";
import { createResolver } from "~features/i18n/domain/strategies/locale-resolvers";
import { createPersistenceStrategy } from "~features/i18n/domain/strategies/persistence-strategies";
import { LoggerPort } from "~common/domain/ports/logger.port";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";
import { PersistLocaleUseCase } from "~features/i18n/domain/usecases/persist-locale/persist-locale.usecase";
import { ChangeDirUseCase } from "~features/i18n/domain/usecases/change-dir/change-dir.usecase";

export async function initI18n() {

	const logger = inject(LoggerPort);
	const config = inject(I18nConfigUseCase).handle();
	const persist$ = inject(PersistLocaleUseCase).handle();
	const dirChange$ = inject(ChangeDirUseCase).handle();
	const translateService = inject(TranslateService);
	const locales = config.locales.map(locale => locale.code);

	logger.debug("Available locales", locales);
	translateService.addLangs(locales);

	let locale: Locale | null = null,
	resolverName = "";
	for (const { resolver: Resolver, persistenceStrategy: PersistenceStrategy } of config.resolvers) {
		const resolver = createResolver(Resolver, config);
		resolverName = resolver.constructor.name;
		locale = await resolver.getLocale();
		if (locale !== null) {
			if (PersistenceStrategy) {
				await createPersistenceStrategy(PersistenceStrategy, config).persistLocale(locale);
			}
			break;
		}
	}
	logger.debug(`Setting locale '${locale?.code}' resolved by ${resolverName}`);
	if (locale === null) {
		logger.fatal("No locale could be resolved");
		return;
	}

	translateService.setDefaultLang(locales[0]);
	translateService.use(locale.code);

	persist$.subscribe();
	dirChange$.subscribe();
}

export function httpLoaderFactory(config: I18nConfig) {

	return function (http: HttpClient) {
		return new TranslateHttpLoader(
			http,
			`${config.translationPath}/`,
			`.json`
		);
	}
}
