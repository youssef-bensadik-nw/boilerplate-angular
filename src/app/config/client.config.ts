import {
	APP_INITIALIZER,
	ApplicationConfig,
	importProvidersFrom, Injector,
	provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes.config';
import { provideClientHydration } from '@angular/platform-browser';
import { i18nProvider } from "../../lib";
import { provideHttpClient } from "@angular/common/http";
import { LoggerModule, NGXLogger, NgxLoggerLevel } from "ngx-logger";
import { initializeAppFactory } from "../app.init";
import { TranslateService } from "@ngx-translate/core";

const loggerProvider = LoggerModule.forRoot({
	level: NgxLoggerLevel.DEBUG, // TODO: Change to ERROR for production
	disableFileDetails: true,
});

export const clientConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideHttpClient(),
		importProvidersFrom([
			i18nProvider,
			loggerProvider,
		]),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeAppFactory,
			multi: true,
			deps: [Injector, NGXLogger, TranslateService],
		}
	]
};
