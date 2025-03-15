import { APP_INITIALIZER, Injector, PLATFORM_ID, runInInjectionContext } from "@angular/core";
import { I18N_CONFIG, type I18nConfig, initI18n } from '../i18n';
import { isPlatformBrowser } from '@angular/common';


interface ClientOnlyInitializersParams {
	i18nConfig: I18nConfig;
}

/**
 * Initializers that should only run on the client side
 */
async function clientOnlyInitializers({ i18nConfig }: ClientOnlyInitializersParams) {
	await initI18n(i18nConfig);
}

/**
 * Initializers that should only run on the server side
 */
async function serverOnlyInitializers() {
	// This function is intentionally left blank
}

/**
 * Initializers that should run on both the server and client side
 */
async function sharedInitializers() {
	// This function is intentionally left blank
}


/**
 * Initialize the application
 * This function is called before the application starts
 */
export function initializeAppFactory(injector: Injector) {
	return async function () {

		await runInInjectionContext(injector, sharedInitializers);

		const platformId = injector.get(PLATFORM_ID),
		 i18nConfig = injector.get<I18nConfig>(I18N_CONFIG);

		if (!isPlatformBrowser(platformId)) {
			await runInInjectionContext(injector, serverOnlyInitializers);
			return;
		}

		await runInInjectionContext(injector, async () => await clientOnlyInitializers({ i18nConfig }));

	}
}

export function provideAppInitializer() {
	return {
		provide: APP_INITIALIZER,
		useFactory: initializeAppFactory,
		multi: true,
		deps: [Injector],
	};
}
