import type { Observable } from "rxjs";
import type { Locale } from "~features/i18n/domain/types/Locale";
import type { LocaleDetails } from "~features/i18n/domain/types/LocaleDetails";

export abstract class LocalePort {
	abstract setCurrent(locale: Locale): void;
	abstract readonly currentLocale$: Observable<LocaleDetails | undefined>;
}
