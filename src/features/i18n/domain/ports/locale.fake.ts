import { BehaviorSubject, type Observable } from "rxjs";
import type { LocalePort } from "./locale.port";
import type { LocaleDetails } from "../types/LocaleDetails";
import type { Locale } from "../types/Locale";
import type { TranslationKeys } from "../types/TranslationKeys";

export class LocaleFake implements LocalePort {

	private _currentLocale$ = new BehaviorSubject<LocaleDetails | undefined>(undefined);
    public currentLocale$: Observable<LocaleDetails | undefined> = this._currentLocale$.asObservable();

    public setCurrent(locale: Locale): void {
		this._currentLocale$.next({
			locale,
			translations: {} as TranslationKeys
		});
    }
}
