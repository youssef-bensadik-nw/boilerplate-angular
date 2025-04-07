import { Locale } from "~features/i18n/domain/types/Locale";
import { SetLocaleUseCase } from "~features/i18n/domain/usecases/set-locale/set-locale.usecase";
import { LocaleFake } from "~features/i18n/domain/ports/locale.fake";
import { skip } from "rxjs";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import { createInjectableWithProviders } from "~common/domain/utils";

describe("SetLocaleUseCase", () => {

	const localeFake = new LocaleFake();

	const setLocaleUseCase = createInjectableWithProviders({
		injectable: SetLocaleUseCase,
		providers: [
			{ provide: LocalePort, useValue: localeFake }
		]
	});

	const locale: Locale = {
		code: "en-US",
		localeSpecificName: "English"
	};

	it("should set the current locale", () => {
		localeFake.currentLocale$
			.pipe(skip(1))
			.subscribe((details) => {
				expect(details?.locale).toEqual(locale);
			});
		setLocaleUseCase.handle(locale);
	});
});

