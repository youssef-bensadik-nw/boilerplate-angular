import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { httpLoaderFactory } from "./i18n.init";
import { I18nConfig } from "./types";
import { InjectionToken, Provider } from "@angular/core";

export const I18N_CONFIG = new InjectionToken("I18N_CONFIG");

export const provideI18n: (config: I18nConfig) => Provider[] = function(config: I18nConfig) {
	return [
		...TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory(config),
				deps: [HttpClient]
			},
		}).providers as Provider[],
		{
			provide: I18N_CONFIG,
			useValue: config
		}
	];
}
