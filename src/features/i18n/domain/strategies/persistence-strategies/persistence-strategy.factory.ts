import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { LocalePersistenceStrategy } from "~features/i18n/domain/types/LocalePersistenceStrategy";

type LocalePersistenceStrategyCtor = new (config: I18nConfig) => LocalePersistenceStrategy;
export const createPersistenceStrategy = (ctor: LocalePersistenceStrategyCtor, config: I18nConfig) => new ctor(config)
