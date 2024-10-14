import type { I18nConfig } from "./types";
import type { LocaleResolver } from "./resolvers";
import type { LocalePersistenceStrategy } from "./persistence-strategies";

interface LocaleResolverCtor {
	new (config: I18nConfig): LocaleResolver;
}

interface LocalePersistenceStrategyCtor {
	new (config: I18nConfig): LocalePersistenceStrategy;
}

export const createResolver = (ctor: LocaleResolverCtor, config: I18nConfig) => {
	return new ctor(config);
};

export const createPersistenceStrategy = (ctor: LocalePersistenceStrategyCtor, config: I18nConfig) => {
	return new ctor(config);
}
