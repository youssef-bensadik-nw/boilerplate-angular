import { Injectable } from "~common/domain/utils/Injectable";
import { LocalePort } from "~features/i18n/domain/ports/locale.port";
import type { Locale } from "~features/i18n/domain/types/Locale";

export class SetLocaleUseCase extends Injectable {
	private readonly locale = this.inject(LocalePort);

	handle(locale: Locale): void {
		this.locale.setCurrent(locale);
	}
}
