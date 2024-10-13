import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { httpLoaderFactory } from "./i18n.init";
import { I18nConfig } from "./types";


export const i18nProvider = function(config: I18nConfig) {
	return TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: httpLoaderFactory(config),
			deps: [HttpClient]
		},
	});
}
