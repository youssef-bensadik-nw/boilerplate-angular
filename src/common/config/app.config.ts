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
import { LoggerPort } from '~common/domain/ports/logger';
import { LoggerAdapter } from '~common/infra/adapters/logger';
import { BodyPort } from '~common/domain/ports/body';
import { WebBodyAdapter } from '~common/infra/adapters/body';
import { StoragePort } from '~common/domain/ports/storage';
import { LocalStorageAdapter } from '~common/infra/adapters/storage';
import { DeviceLanguagePort } from '~common/domain/ports/device';
import { NavigatorLanguageAdapter } from '~common/infra/adapters/device';

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
		{ provide: BodyPort, useClass: WebBodyAdapter },
		{ provide: LoggerPort, useClass: LoggerAdapter },
		{ provide: StoragePort, useClass: LocalStorageAdapter },
		{ provide: DeviceLanguagePort, useClass: NavigatorLanguageAdapter },
	]
};

export const serverConfig = mergeApplicationConfig(clientConfig, {
	providers: [
		provideServerRendering()
	]
});
