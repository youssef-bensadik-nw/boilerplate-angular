import type { I18nConfig } from "../types";
import type { LocalePersistenceStrategy } from "./LocalePersistenceStrategy";

type LocalePersistenceStrategyCtor = new (config: I18nConfig) => LocalePersistenceStrategy;
export const createPersistenceStrategy = (ctor: LocalePersistenceStrategyCtor, config: I18nConfig) => new ctor(config)
