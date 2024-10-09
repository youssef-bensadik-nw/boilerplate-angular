import { isPlatformBrowser } from '@angular/common';
import { Injector, PLATFORM_ID, runInInjectionContext } from "@angular/core";
import { initI18n } from "../i18n";
import { i18nConfig } from "./config/i18n.config";


/**
 * Initializers that should only run on the client side
 */
async function clientOnlyInitializers() {
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

		const platformId = injector.get(PLATFORM_ID);

		if (!isPlatformBrowser(platformId)) {
			await runInInjectionContext(injector, serverOnlyInitializers);
			return;
		}

		await runInInjectionContext(injector, clientOnlyInitializers);

	}
}
