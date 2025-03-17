import { Injectable, Signal, inject, signal } from "@angular/core";
import type { LocaleCode, TranslationKeys } from "@gen";
import { NGXLogger } from "ngx-logger";
import { type LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

import type {
	Locale,
	I18nConfig,
    CallableLeaf,
	LocaleDirection,
} from "../types";

import type { LocaleDetails, RefinedLocale, TranslationService } from "./translation.service";
import { I18N_CONFIG } from "../providers";
import { createPersistenceStrategy } from "../persistence-strategies";
import { createDirectionChangeHandler } from "../direction-change-handlers";

@Injectable()
export class TranslationServiceImpl implements TranslationService {

	constructor(private readonly logger: NGXLogger, private readonly service: TranslateService) {

		const resolveLocaleDetailsFromEvent = map((event: LangChangeEvent) => this.resolveLocaleDetailsFromEvent(event)),
		 setCurrentLocale = tap(({ locale }: LocaleDetails) => {
			this._currentLocale.set(locale);
			this.logger.debug(`Language changed to "${locale.code}".`);
		}),
		 persistLocale = tap(async ({ locale: { code }  }: LocaleDetails) => await this.persist(code)),
		 handleDirChange = tap(({ locale: { direction } }: LocaleDetails) => this.handleDirChange(direction)),
		 buildTranslationsObservable = map(({ translations }: LocaleDetails) => this.createCallableLeaf(translations));

		this.translationKeys = toSignal(service.onLangChange.asObservable()
			.pipe(resolveLocaleDetailsFromEvent)
			.pipe(setCurrentLocale)
			.pipe(persistLocale)
			.pipe(handleDirChange)
			.pipe(buildTranslationsObservable));
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
			let translation = String(translations[key]);

			const callableFn = (args?: Record<string, string>): string => {

				if (!args) {
					return translation;
				}
				const placeholders = translation.match(/{[^}]+}/g) || [];
				if (placeholders.length === 0) {
					return translation;
				}
				const values = placeholders.map((placeholder: string) => {
					const index = placeholder.slice(1, -1),
					value = args[index];
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

			Object.defineProperty(callableLeaf, key, {
				configurable: true,
				enumerable: true,
				get: function() {
					callableFn.toString = () => translation;
					return callableFn;
				}
			});
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
	private resolveLocaleDetailsFromEvent(event: LangChangeEvent): LocaleDetails {
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

	public translationKeys: Signal<CallableLeaf<TranslationKeys> | undefined>;
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
	public currentLocale = this._currentLocale.asReadonly() as Signal<RefinedLocale>;
	public availableLocales = signal<RefinedLocale[]>(this.i18nConfig.locales as RefinedLocale[]).asReadonly();
}

