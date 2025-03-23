import { filter, map, type Observable } from "rxjs";
import { UseCase } from "~common/domain/usecases/usecase";
import type { Locale } from "~features/i18n/domain/types/Locale";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";

export class CurrentLocaleUseCase extends UseCase {

	private readonly locale = this.inject(LocalePort);

	handle(): Observable<Locale> {
		return this.locale.currentLocale$
			.pipe(filter(Boolean))
			.pipe(map(({ locale }) => locale));
	}
}
