import {
	isDevMode,
	ApplicationConfig,
	importProvidersFrom,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes.config';
import { provideClientHydration } from '@angular/platform-browser';
import { provideI18n } from "../../../lib";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { provideAppInitializer } from "../app.init";
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
		provideI18n(i18nConfig),
		provideAppInitializer(),
		importProvidersFrom([
			loggerProvider,
		]),
	]
};
