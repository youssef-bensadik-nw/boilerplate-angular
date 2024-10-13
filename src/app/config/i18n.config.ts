import {
	DefaultLocaleResolver,
	LocalStorageLocaleResolver,
	NavigatorLocaleResolver,
	LocalStorageLocalePersistenceStrategy,
	type I18nConfig,
} from "../../lib";

export const i18nConfig: I18nConfig = {

	/**
	 * Define the available locales for the application.
	 *
	 * Important: The first locale is the default one.
	 * Important: The code must correspond to the translation file in `public/translations`.
	 */
	locales: [

		/** Default locale **/
		{
			code: "en-US",
			localeSpecificName: "English",
			direction: "ltr"
		},
		{
			code: "fr-FR",
			localeSpecificName: "Français",
			direction: "ltr"
		},
		{
			code: "ar-MA",
			localeSpecificName: "العربية",
			direction: "rtl"
		}
	],

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
	],

	/**
	 * The key to use for the locale persistence.
	 * For instance, for the local storage strategy, the locale will be stored under this key.
	 */
	persistenceKey: "i18n-locale",

	/**
	 * Location of the translation files.
	 */
	translationPath: "translations",
}
