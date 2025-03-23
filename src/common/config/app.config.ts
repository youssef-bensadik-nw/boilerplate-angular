import {
	ApplicationConfig,
	importProvidersFrom,
	isDevMode,
	mergeApplicationConfig,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes.config';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { provideAppInitializer } from "./app.init";
import { provideServerRendering } from '@angular/platform-server';
import { provideI18n } from '~features/i18n/config/i18n.provider';
import { LoggerPort } from '~common/domain/ports/logger.port';
import { LoggerAdapter } from '~common/infra/adapters/logger.adapter';

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
		provideI18n(),
		provideAppInitializer(),
		importProvidersFrom([
			loggerProvider,
		]),
		{ provide: LoggerPort, useClass: LoggerAdapter },
	]
};

export const serverConfig = mergeApplicationConfig(clientConfig, {
	providers: [
		provideServerRendering()
	]
});
