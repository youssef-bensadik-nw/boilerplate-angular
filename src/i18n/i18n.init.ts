import { NGXLogger} from "ngx-logger";
import { TranslateService } from "@ngx-translate/core";
import { availableLocales } from "./available-locales";
import type { Locale } from "./types";
import { i18nConfig } from "./i18n.config";

export async function initI18n(logger: NGXLogger, translateService: TranslateService) {
	logger.info("Initializing application...");
	const locales = availableLocales.map(locale => locale.name);

	logger.debug("Available locales", locales);
	translateService.addLangs(locales);

	let locale: Locale | null = null;
	let resolverName: string = "";
	for (const {resolver: Resolver, persistenceStrategy: PersistenceStrategy} of i18nConfig.resolvers) {
		const resolver = new Resolver();
		resolverName = resolver.constructor.name;
		locale = await resolver.getLocale();
		if (locale !== null) {
			if (PersistenceStrategy) {
				new PersistenceStrategy().persistLocale(locale);
			}
			break;
		}
	}
	logger.debug(`Setting locale '${locale?.name}' resolved by ${resolverName}`);
	if (locale === null) {
		logger.fatal("No locale could be resolved");
		return;
	}
	translateService.setDefaultLang(locale.name);
}
