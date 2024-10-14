import { LocaleCode, TranslationKeys } from "../../gen";
import { inject, Injectable, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { map, Observable, tap } from "rxjs";
import { NGXLogger } from "ngx-logger";
import { I18nConfig, Locale, LocaleDirection } from "./types";
import { createPersistenceStrategy } from "./ctor";
import { I18N_CONFIG } from "./provide-i18n";

type CallableLeaf<T> = {
	[K in keyof T]: T[K] extends object
		? CallableLeaf<T[K]> // If the value is an object, apply CallableLeaf recursively
		: (...args: string[]) => T[K]; // If the value is not an object, convert it to a function returning the original type
};

type RefinedLocale = {
	code: LocaleCode
	localeSpecificName?: string,
	direction: LocaleDirection,
};

@Injectable({ providedIn: "root" })
export class TranslationService {

	constructor(private readonly logger: NGXLogger, private readonly service: TranslateService) {

		this.tx$ = service.onLangChange.asObservable()
			.pipe(map((event): [locale: Locale, translations: TranslationKeys] => [
				this.getLocaleObject(event.lang) ?? this.i18nConfig.locales[0],
				event.translations
			]))
			.pipe(tap(([locale]) => this._currentLocale.set(locale)))
			.pipe(tap(([locale]) => this.logger.debug(`Language changed to "${locale.code}".`)))
			.pipe(tap(([locale]) => this.persist(locale.code)))
			.pipe(tap(([_, translations]) => this.logger.debug("Loaded translations:", translations)))
			.pipe(map(([_, translations]) => this.createCallableLeaf(translations)));
	}

	private i18nConfig = inject<I18nConfig>(I18N_CONFIG);
	private _currentLocale = signal<Locale>(this.i18nConfig.locales[0]);
	private getLocaleObject(locale: string) {
		const localeObject = this.i18nConfig.locales.find((l) => l.code === locale);
		if (!localeObject) {
			this.logger.error(`Locale "${locale}" not found.`);
			return undefined;
		}
		return localeObject;
	}
	private createCallableLeaf(translations: TranslationKeys): CallableLeaf<TranslationKeys> {
		const callableLeaf = {} as CallableLeaf<TranslationKeys>;
		for (const key in translations) {
			if (typeof translations[key as keyof TranslationKeys] === "object") {
				// @ts-ignore
				callableLeaf[key] = this.createCallableLeaf(translations[key]);
				continue;
			}

			// @ts-ignore
			callableLeaf[key] = (...args: string[]): string => {
				// @ts-ignore
				let translation = String(translations[key]);
				const placeholders = translation.match(/{\d+}/g) || [];
				if (placeholders.length === 0) {
					return translation;
				}
				const values = placeholders.map((placeholder) => {
					const index = Number(placeholder.slice(1, -1));
					return args[index];
				});
				placeholders.forEach((placeholder, index) => {
					translation = translation.replace(placeholder, values[index]);
				});
				return translation;
			}
		}
		return callableLeaf;
    }
	private persist(locale: string) {
		const localeObject = this.getLocaleObject(locale);
		if (!localeObject) {
			return;
		}
		const strategy = createPersistenceStrategy(this.i18nConfig.onLocaleChangePersistenceStrategy, this.i18nConfig);
		this.logger.debug(`Persisting locale "${locale} according to strategy "${strategy.constructor.name}".`);
		strategy.persistLocale(localeObject);
	}

	public tx$: Observable<CallableLeaf<TranslationKeys>>;
	public useLocale(locale: LocaleCode) {
		if (this._currentLocale().code === locale) {
			this.logger.warn(`Locale "${locale}" is already in use.`);
			return;
		}
		this.logger.info(`Using locale "${locale}".`);
		if (!this.getLocaleObject(locale)) {
			return;
		}
		return this.service.use(locale);
	}
	public currentLocale = this._currentLocale.asReadonly();
	public availableLocales = signal<RefinedLocale[]>(this.i18nConfig.locales as RefinedLocale[]).asReadonly();

}
