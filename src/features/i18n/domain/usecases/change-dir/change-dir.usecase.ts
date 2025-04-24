import { Injectable } from "~common/domain/utils/Injectable";
import { LocalePort } from "~features/i18n/domain/ports/locale";
import { filter, map, type Observable } from "rxjs";
import type { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";
import { LoggerPort } from "~common/domain/ports/logger";
import { createDirectionChangeHandler } from "~features/i18n/domain/strategies/direction-change-handlers";
import { i18nConfig } from "~features/i18n/domain/i18n.config";

const DEFAULT_DIRECTION = "ltr";

export class ChangeDirUseCase extends Injectable {

	private readonly logger = this.inject(LoggerPort);
	private readonly locale = this.inject(LocalePort);

	private handleDirChange(direction: LocaleDirection) {
		i18nConfig.directionChangeHandlers.forEach(async (handlerClass) => {
			const handler = createDirectionChangeHandler(handlerClass, direction);
			this.logger.debug(`Handling direction change with "${handler.constructor.name}".`);
			await handler.onDirectionChange(direction);
		});
	}

	handle(): Observable<void> {
		return this.locale.currentLocale$
			.pipe(filter(Boolean))
			.pipe(map(({ locale: { direction } }) => direction ?? DEFAULT_DIRECTION))
			.pipe(map((direction) => this.handleDirChange(direction)));
	}
}
