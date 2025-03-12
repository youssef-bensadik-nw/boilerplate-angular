import { LocaleDirection } from "../types";

export interface DirectionChangeHandler {
	/**
	 * Handles the direction change.
	 */
	onDirectionChange(dir: LocaleDirection): Promise<void>;
}
