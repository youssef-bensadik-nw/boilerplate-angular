import { LoggerFake } from "~common/domain/ports/logger.fake";
import { LocaleFake } from "~features/i18n/domain/ports/locale.fake";
import { TranslationKeysUseCase } from "~features/i18n/domain/usecases/translation-keys/translation-keys.usecase";
import { createInjectableWithProviders } from "~common/domain/utils";
import { LoggerPort } from "~common/domain/ports/logger.port";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import { Observable } from "rxjs";
import { CallableLeaf } from "~features/i18n/domain/types/CallableLeaf";

describe("TranslationKeysUseCase", () => {
	const translations = {
		test: "Lorem ipsum dolor sit amet",
		testWithArgs: "Lorem {ipsum} dolor sit amet",
		nested: {
			test: "Lorem ipsum dolor sit amet",
		}
	} as const;

	const fakeLogger = new LoggerFake();
	const fakeLocale = new LocaleFake(translations);

	const useCase = createInjectableWithProviders({
		injectable: TranslationKeysUseCase,
		providers: [
			{ provide: LoggerPort, useValue: fakeLogger },
			{ provide: LocalePort, useValue: fakeLocale },
		]
	});

	let keys$: Observable<CallableLeaf<typeof translations>>;

	beforeEach(() => {
		keys$ = useCase.handle() as unknown as Observable<CallableLeaf<typeof translations>>;
	});

	it("should create a callable leaf", () => {
		expect(keys$).toBeDefined();
	});

	it("should return the correct translation", () => {
		keys$.subscribe((keys) => {
			expect(keys.test).toEqual(translations.test);
		});
	});

	it("should return the correct translation with args", () => {
		keys$.subscribe((keys) => {
			expect(keys.testWithArgs({ ipsum: "ipsum" })).toEqual(translations.test);
		});
	});

	it("should return the correct translation with nested keys", () => {
		keys$.subscribe((keys) => {
			expect(keys.nested.test).toEqual(translations.nested.test);
		});
	});


});
