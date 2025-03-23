import type { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";

export interface DirectionChangeHandler {
	/**
	 * Handles the direction change.
	 */
	onDirectionChange(dir: LocaleDirection): Promise<void>;
}
