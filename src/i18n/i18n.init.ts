import { NGXLogger} from "ngx-logger";
import { TranslateService } from "@ngx-translate/core";
import { inject } from "@angular/core";
import { i18nConfig } from "../app/config/i18n.config";
import type { I18nConfig, Locale } from "./types";
import type { LocaleResolver } from "./resolvers";
import type { LocalePersistenceStrategy } from "./persistence-strategies";

interface LocaleResolverCtor {
	new (config: I18nConfig): LocaleResolver;
}

interface LocalePersistenceStrategyCtor {
	new (config: I18nConfig): LocalePersistenceStrategy;
}

const createResolver = (ctor: LocaleResolverCtor, config: I18nConfig) => {
	return new ctor(config);
};

const createPersistenceStrategy = (ctor: LocalePersistenceStrategyCtor, config: I18nConfig) => {
	return new ctor(config);
}

export async function initI18n(config: I18nConfig) {

		const logger = inject(NGXLogger);
		const translateService = inject(TranslateService);

		logger.info("Initializing application...");
		const locales = config.locales.map(locale => locale.code);

		logger.debug("Available locales", locales);
		translateService.addLangs(locales);

		let locale: Locale | null = null;
		let resolverName: string = "";
		for (const { resolver: Resolver, persistenceStrategy: PersistenceStrategy } of config.resolvers) {
			// const resolver = new Resolver();
			const resolver = createResolver(Resolver, i18nConfig);
			resolverName = resolver.constructor.name;
			locale = await resolver.getLocale();
			if (locale !== null) {
				if (PersistenceStrategy) {
					createPersistenceStrategy(PersistenceStrategy, config).persistLocale(locale);
				}
				break;
			}
		}
		logger.debug(`Setting locale '${locale?.code}' resolved by ${resolverName}`);
		if (locale === null) {
			logger.fatal("No locale could be resolved");
			return;
		}
		translateService.setDefaultLang(locale.code);

}
