import { NGXLogger } from "ngx-logger";
import { TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from '@angular/common';
import { Injector, PLATFORM_ID } from "@angular/core";
import { initI18n } from "../i18n";


/**
 * Initialize the application
 * This function is called before the application starts
 */
export function initializeAppFactory(injector: Injector, logger: NGXLogger, translateService: TranslateService) {
	return async function () {
		const platformId = injector.get(PLATFORM_ID);

		if (!isPlatformBrowser(platformId)) {
			logger.info("Skipping initialization on server platform");
			return;
		}

		await initI18n(logger, translateService);
	}
}
