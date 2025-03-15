import type { LocaleResolver } from "../resolvers";
import type { LocalePersistenceStrategy } from "../persistence-strategies";
import type { Locale } from "./Locale";
import type { LocaleDirection } from "./LocaleDirection";
import type { DirectionChangeHandler } from "../direction-change-handlers";

export interface I18nConfig {
	locales: Locale[],
	resolvers: {
		resolver: new (config: I18nConfig) => LocaleResolver,
		persistenceStrategy?: new (config: I18nConfig) => LocalePersistenceStrategy,
	}[],
	directionChangeHandlers: (new (dir: LocaleDirection) => DirectionChangeHandler)[],
	localeChangePersistenceStrategy: new (config: I18nConfig) => LocalePersistenceStrategy,
	persistenceKey?: string,
	translationPath: string,
}
