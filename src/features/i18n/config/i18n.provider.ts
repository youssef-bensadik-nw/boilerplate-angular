import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { Provider } from "@angular/core";
import { httpLoaderFactory } from "./i18n.init";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import { LocaleAdapter } from "~features/i18n/infra/adapters/locale.adapter";
import { TranslationKeysUseCase } from "~features/i18n/domain/usecases/translation-keys/translation-keys.usecase";
import { I18nConfigUseCase } from "~features/i18n/domain/usecases/i18n-config/i18n-config.usecase";
import { CurrentLocaleUseCase } from "~features/i18n/domain/usecases/current-locale/current-locale.usecase";
import { SetLocaleUseCase } from "~features/i18n/domain/usecases/set-locale/set-locale.usecase";
import { PersistLocaleUseCase } from "~features/i18n/domain/usecases/persist-locale/persist-locale.usecase";
import { ChangeDirUseCase } from "~features/i18n/domain/usecases/change-dir/change-dir.usecase";

export const provideI18n: () => Provider[] = function() {
	const i18nConfigUseCase = new I18nConfigUseCase();
	return [
		...TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory(i18nConfigUseCase.handle()),
				deps: [HttpClient]
			},
		}).providers as Provider[],
		ChangeDirUseCase,
		SetLocaleUseCase,
		PersistLocaleUseCase,
		CurrentLocaleUseCase,
		TranslationKeysUseCase,
		{ provide: LocalePort, useClass: LocaleAdapter },
		{ provide: I18nConfigUseCase, useValue: i18nConfigUseCase },
	];
}
