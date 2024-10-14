import { DirectionChangeHandler } from "./DirectionChangeHandler";
import { LocaleDirection } from "../types";

export class UpdateBodyDirAttributeDirectionChangeHandler implements DirectionChangeHandler {
    public onDirectionChange(dir: LocaleDirection): Promise<void> {
		return new Promise((resolve) => {
			document.body.setAttribute("dir", dir);
			resolve();
		});
    }
}
