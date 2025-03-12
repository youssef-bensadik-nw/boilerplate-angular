import type { I18nConfig, LocaleDirection } from "./types";
import type { LocaleResolver } from "./resolvers";
import type { LocalePersistenceStrategy } from "./persistence-strategies";
import type { DirectionChangeHandler } from "./direction-change-handlers";

type LocaleResolverCtor = new (config: I18nConfig) => LocaleResolver;

type LocalePersistenceStrategyCtor = new (config: I18nConfig) => LocalePersistenceStrategy;

type DirectionChangeHandlerCtor = new (dir: LocaleDirection) => DirectionChangeHandler;

export const createResolver = (ctor: LocaleResolverCtor, config: I18nConfig) => new ctor(config);

export const createPersistenceStrategy = (ctor: LocalePersistenceStrategyCtor, config: I18nConfig) => new ctor(config)

export const createDirectionChangeHandler = (ctor: DirectionChangeHandlerCtor, dir: LocaleDirection) => new ctor(dir)
