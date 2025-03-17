import { Injectable, Signal } from '@angular/core';
import { LocaleCode, TranslationKeys } from '@gen';
import type { CallableLeaf, Locale, LocaleDirection } from '../types';

export interface RefinedLocale {
	code: LocaleCode;
	localeSpecificName?: string;
	direction: LocaleDirection;
}

export interface LocaleDetails { locale: Locale, translations: TranslationKeys }

@Injectable()
export abstract class TranslationService {
	abstract translationKeys: Signal<CallableLeaf<TranslationKeys> | undefined>;
	abstract currentLocale: Signal<RefinedLocale>;
	abstract availableLocales: Signal<RefinedLocale[]>;
	abstract useLocale(locale: LocaleCode): void;
}
