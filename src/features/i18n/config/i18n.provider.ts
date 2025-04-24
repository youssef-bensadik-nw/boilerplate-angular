import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { Provider } from "@angular/core";
import { httpLoaderFactory } from "./i18n.init";
import { LocalePort } from "~features/i18n/domain/ports/locale";
import { LocaleAdapter } from "~features/i18n/infra/adapters/locale.adapter";
import { TranslationKeysUseCase } from "~features/i18n/domain/usecases/translation-keys";
import { CurrentLocaleUseCase } from "~features/i18n/domain/usecases/current-locale";
import { SetLocaleUseCase } from "~features/i18n/domain/usecases/set-locale";
import { PersistLocaleUseCase } from "~features/i18n/domain/usecases/persist-locale";
import { ChangeDirUseCase } from "~features/i18n/domain/usecases/change-dir";
import { i18nConfig } from "~features/i18n/domain/i18n.config";


export const provideI18n: () => Provider[] = function() {
	return [
		...TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory(i18nConfig),
				deps: [HttpClient]
			},
		}).providers as Provider[],
		ChangeDirUseCase,
		SetLocaleUseCase,
		PersistLocaleUseCase,
		CurrentLocaleUseCase,
		TranslationKeysUseCase,
		{ provide: LocalePort, useClass: LocaleAdapter },
	];
}
