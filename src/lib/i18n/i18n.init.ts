import { NGXLogger} from "ngx-logger";
import { TranslateService } from "@ngx-translate/core";
import { inject } from "@angular/core";
import type { I18nConfig, Locale } from "./types";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { createPersistenceStrategy, createResolver } from "./ctor";

export async function initI18n(config: I18nConfig) {

		const logger = inject(NGXLogger);
		const translateService = inject(TranslateService);
		const locales = config.locales.map(locale => locale.code);

		logger.debug("Available locales", locales);
		translateService.addLangs(locales);

		let locale: Locale | null = null;
		let resolverName: string = "";
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
