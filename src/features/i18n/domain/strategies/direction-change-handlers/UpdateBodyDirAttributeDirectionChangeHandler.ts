import { DirectionChangeHandler } from "~features/i18n/domain/types/DirectionChangeHandler";
import { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";

export class UpdateBodyDirAttributeDirectionChangeHandler implements DirectionChangeHandler {
    public onDirectionChange(dir: LocaleDirection): Promise<void> {
		return new Promise((resolve) => {
			document.body.setAttribute("dir", dir);
			resolve();
		});
    }
}
