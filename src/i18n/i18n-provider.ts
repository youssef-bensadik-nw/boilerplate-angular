import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";

// AoT requires an exported function for factories
export function httpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'translations/', '.json');
}

export const i18nProvider = TranslateModule.forRoot({
	loader: {
		provide: TranslateLoader,
		useFactory: httpLoaderFactory,
		deps: [HttpClient]
	},
});
