import type { LocaleResolver } from "../resolvers";
import type { LocalePersistenceStrategy } from "../persistence-strategies";
import type { Locale } from "./Locale";

export type I18nConfig = {
	locales: Locale[],
	resolvers: Array<{
		resolver: new (config: I18nConfig) => LocaleResolver,
		persistenceStrategy?: new (config: I18nConfig) => LocalePersistenceStrategy,
	}>,
	persistenceKey?: string,
}
