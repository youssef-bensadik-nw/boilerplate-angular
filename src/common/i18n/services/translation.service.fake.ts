import { type Signal, signal } from "@angular/core";
import type { LocaleCode, TranslationKeys } from "@gen";
import type { CallableLeaf } from "../types";
import type { TranslationService, RefinedLocale } from "./translation.service";

const locales: RefinedLocale[] = [
	{ code: "en-US", direction: "ltr", localeSpecificName: "English" }
];

export class FakeTranslationService implements TranslationService {

	constructor(keys: object) {
		this.translationKeys = signal(
			keys as unknown as CallableLeaf<TranslationKeys>
		).asReadonly();
	}

	public translationKeys: Signal<CallableLeaf<TranslationKeys>>;
	public currentLocale = signal(locales[0]).asReadonly() as Signal<RefinedLocale>;
	public availableLocales = signal(locales).asReadonly();
	public useLocale(locale: LocaleCode) {
		throw new Error("Method not implemented.");
	}

}
