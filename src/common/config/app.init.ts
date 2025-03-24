import {
	inject,
	Injector,
	PLATFORM_ID,
	runInInjectionContext,
	provideAppInitializer as _provideAppInitializer,
} from "@angular/core";

import { isPlatformBrowser } from '@angular/common';
import { initI18n } from "~features/i18n/config/i18n.init";
import { Injectable } from "~common/domain/utils/Injectable";

/**
 * Initializers that should only run on the client side
 */
async function clientOnlyInitializers() {
	await initI18n();
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
async function initializeAppFactory(injector: Injector) {

	await runInInjectionContext(injector, sharedInitializers);

	const platformId = injector.get(PLATFORM_ID);

	if (!isPlatformBrowser(platformId)) {
		await runInInjectionContext(injector, serverOnlyInitializers);
		return;
	}

	await runInInjectionContext(injector, async () => await clientOnlyInitializers());
}

export const provideAppInitializer  = () => _provideAppInitializer(() => {
	const injector = inject(Injector);

	//@ts-expect-error: Override readonly property to enable dependency injection in domain
	Injectable.ɵinjector = injector;

	initializeAppFactory(injector);
});
