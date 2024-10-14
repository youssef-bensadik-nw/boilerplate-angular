import type { I18nConfig, LocaleDirection } from "./types";
import type { LocaleResolver } from "./resolvers";
import type { LocalePersistenceStrategy } from "./persistence-strategies";
import type { DirectionChangeHandler } from "./direction-change-handlers";

interface LocaleResolverCtor {
	new (config: I18nConfig): LocaleResolver;
}

interface LocalePersistenceStrategyCtor {
	new (config: I18nConfig): LocalePersistenceStrategy;
}

interface DirectionChangeHandlerCtor {
	new (dir: LocaleDirection): DirectionChangeHandler;
}

export const createResolver = (ctor: LocaleResolverCtor, config: I18nConfig) => {
	return new ctor(config);
};

export const createPersistenceStrategy = (ctor: LocalePersistenceStrategyCtor, config: I18nConfig) => {
	return new ctor(config);
}

export const createDirectionChangeHandler = (ctor: DirectionChangeHandlerCtor, dir: LocaleDirection) => {
	return new ctor(dir);
}
