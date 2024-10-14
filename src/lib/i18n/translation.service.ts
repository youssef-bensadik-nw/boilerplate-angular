import { LocaleCode, TranslationKeys } from "../../gen";
import { inject, Injectable, signal } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { map, Observable, tap } from "rxjs";
import { NGXLogger } from "ngx-logger";
import { I18nConfig, Locale, LocaleDirection } from "./types";
import { createDirectionChangeHandler, createPersistenceStrategy } from "./ctor";
import { I18N_CONFIG } from "./provide-i18n";

type CallableLeaf<T> = {
	[K in keyof T]: T[K] extends object
		? CallableLeaf<T[K]>
		: (...args: string[]) => T[K];
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
			.pipe(map((event) => this.resolve(event)))
			.pipe(tap(({ locale }) => this._currentLocale.set(locale)))
			.pipe(tap(({ locale: { code } }) => this.logger.debug(`Language changed to "${code}".`)))
			.pipe(tap(async ({ locale: { code }  }) => await this.persist(code)))
			.pipe(tap(({ locale: { direction } }) => this.handleDirChange(direction)))
			.pipe(tap(({ translations }) => this.logger.debug("Loaded translations:", translations)))
			.pipe(map(({ translations }) => this.createCallableLeaf(translations)));
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
	private async persist(locale: string) {
		const localeObject = this.getLocaleObject(locale);
		if (!localeObject) {
			return;
		}
		const strategy = createPersistenceStrategy(this.i18nConfig.localeChangePersistenceStrategy, this.i18nConfig);
		this.logger.debug(`Persisting locale "${locale} according to strategy "${strategy.constructor.name}".`);
		await strategy.persistLocale(localeObject);
	}
	private resolve(event: LangChangeEvent):  { locale: Locale, translations: TranslationKeys } {
		return {
			locale: (this.getLocaleObject(event.lang) ?? this.i18nConfig.locales[0]),
			translations: event.translations
		}
	}
	private handleDirChange(direction: LocaleDirection | undefined) {
		const defaultDirection = "ltr";
		this.i18nConfig.directionChangeHandlers.forEach(async (handlerClass) => {
			const handler = createDirectionChangeHandler(handlerClass, direction ?? defaultDirection);
			this.logger.debug(`Handling direction change with "${handler.constructor.name}".`);
			await handler.onDirectionChange(direction ?? defaultDirection);
		});
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
