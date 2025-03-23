import { filter, map, type Observable } from "rxjs";
import type { TranslationKeys } from "~features/i18n/domain/types/TranslationKeys";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import { LoggerPort } from "~common/domain/ports/logger.port";
import type { CallableLeaf } from "~features/i18n/domain/types/CallableLeaf";
import { UseCase } from "~common/domain/usecases/usecase";

export class TranslationKeysUseCase extends UseCase {

	private readonly logger = this.inject(LoggerPort);
	private readonly locale = this.inject(LocalePort);

	private createCallableLeaf = (translations: TranslationKeys): CallableLeaf<TranslationKeys> => {
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
    };

	public handle(): Observable<CallableLeaf<TranslationKeys>> {
		return this.locale.currentLocale$
			.pipe(filter(Boolean))
			.pipe(map(({ translations }) => translations))
			.pipe(map(this.createCallableLeaf));
	}
}
