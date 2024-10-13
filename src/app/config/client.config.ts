import {
	Injector,
	isDevMode,
	APP_INITIALIZER,
	ApplicationConfig,
	importProvidersFrom,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes.config';
import { provideClientHydration } from '@angular/platform-browser';
import { i18nProvider } from "../../lib";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { initializeAppFactory } from "../app.init";
import { i18nConfig } from "./i18n.config";

const loggerProvider = LoggerModule.forRoot({
	level: isDevMode() ? NgxLoggerLevel.DEBUG : NgxLoggerLevel.INFO,
	disableFileDetails: true,
});

export const clientConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideHttpClient(withFetch()),
		importProvidersFrom([
			i18nProvider(i18nConfig),
			loggerProvider,
		]),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeAppFactory,
			multi: true,
			deps: [Injector],
		}
	]
};
