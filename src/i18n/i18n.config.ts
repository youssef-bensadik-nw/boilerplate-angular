import {
	type LocaleResolver,
	DefaultLocaleResolver,
	LocalStorageLocaleResolver,
	NavigatorLocaleResolver,
} from "./resolvers";

import {
	type LocalePersistenceStrategy,
	LocalStorageLocalePersistenceStrategy
} from "./persistence-strategy";

type I18nConfig = {
	resolvers: Array<{
		resolver: new () => LocaleResolver,
		persistenceStrategy?: new () => LocalePersistenceStrategy,
	}>
}

export const i18nConfig: I18nConfig = {
	/**
	 * The resolvers are tried in order, so the most specific resolver should be first
	 * The first one that returns a non-null locale will be used
	 * Once a locale is resolved, it is persisted according to the specified `persistenceStrategy`
	 * or ignored if not strategy is specified.
	 * */
	resolvers: [
		{ resolver: LocalStorageLocaleResolver },
		{ resolver: NavigatorLocaleResolver, persistenceStrategy: LocalStorageLocalePersistenceStrategy },
		{ resolver: DefaultLocaleResolver, persistenceStrategy: LocalStorageLocalePersistenceStrategy },
	]
}
