import { inject, Injectable, signal } from "@angular/core";
import { LocaleCode, TranslationKeys } from "../../../gen";
import { NGXLogger } from "ngx-logger";
import { type LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { map, Observable, tap } from "rxjs";
import {
	createDirectionChangeHandler,
	createPersistenceStrategy,
	I18N_CONFIG,
	I18nConfig,
	type Locale,
	type LocaleDirection
} from "../../../lib";

type CallableLeaf<T> = {
	[K in keyof T]: T[K] extends object
		? CallableLeaf<T[K]>
		: (args: Record<string, string> | undefined) => T[K];
};

type RefinedLocale = {
	code: LocaleCode
	localeSpecificName?: string,
	direction: LocaleDirection,
};

type LocaleDetails = { locale: Locale, translations: TranslationKeys }

@Injectable({ providedIn: "root" })
export class TranslationService {

	constructor(private readonly logger: NGXLogger, private readonly service: TranslateService) {

		const resolveLocaleDetailsFormEvent = map((event: LangChangeEvent) => this.resolveLocaleDetailsFormEvent(event));
		const setCurrentLocale = tap(({ locale }: LocaleDetails) => {
			this._currentLocale.set(locale);
			this.logger.debug(`Language changed to "${locale.code}".`);
		});
		const persistLocale = tap(async ({ locale: { code }  }: LocaleDetails) => await this.persist(code));
		const handleDirChange = tap(({ locale: { direction } }: LocaleDetails) => this.handleDirChange(direction));
		const buildTranslationsObservable = map(({ translations }: LocaleDetails) => this.createCallableLeaf(translations));

		this.tx$ = service.onLangChange.asObservable()

			.pipe(resolveLocaleDetailsFormEvent)
			.pipe(setCurrentLocale)
			.pipe(persistLocale)
			.pipe(handleDirChange)
			.pipe(buildTranslationsObservable);
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
			callableLeaf[key] = (args?: Record<string, string>): string => {
				// @ts-ignore
				let translation = String(translations[key]);
				if (!args) {
					return translation;
				}
				const placeholders = translation.match(/{[^}]+}/g) || [];
				if (placeholders.length === 0) {
					return translation;
				}
				const values = placeholders.map((placeholder) => {
					const index = placeholder.slice(1, -1);
					const value = args[index];
					if (!value) {
						this.logger.warn(`No value provided for placeholder "${index}" in translation key "${key}".`);
						return "";
					}
					return value;
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
	private resolveLocaleDetailsFormEvent(event: LangChangeEvent): LocaleDetails {
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

