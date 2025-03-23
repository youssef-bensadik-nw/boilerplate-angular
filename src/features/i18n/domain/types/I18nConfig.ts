import type { DirectionChangeHandler } from "~features/i18n/domain/types/DirectionChangeHandler";
import type { Locale } from "~features/i18n/domain/types/Locale";
import type { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";
import type { LocalePersistenceStrategy } from "~features/i18n/domain/types/LocalePersistenceStrategy";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";

export interface I18nConfig {
	locales: Locale[],
	resolvers: Array<{
		resolver: new (config: I18nConfig) => LocaleResolver,
		persistenceStrategy?: new (config: I18nConfig) => LocalePersistenceStrategy,
	}>,
	directionChangeHandlers: (new (dir: LocaleDirection) => DirectionChangeHandler)[],
	localeChangePersistenceStrategy: new (config: I18nConfig) => LocalePersistenceStrategy,
	persistenceKey?: string,
	translationPath: string,
}
