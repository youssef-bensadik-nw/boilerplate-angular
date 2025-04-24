import { BodyPort } from "~common/domain/ports/body";
import { Injectable } from "~common/domain/utils";
import { DirectionChangeHandler } from "~features/i18n/domain/types/DirectionChangeHandler";
import { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";

export class UpdateBodyDirAttributeDirectionChangeHandler extends Injectable implements DirectionChangeHandler {

	private readonly body = this.inject(BodyPort);

    public onDirectionChange(dir: LocaleDirection): Promise<void> {
		return new Promise((resolve) => {
			this.body.setAttribute("dir", dir);
			resolve();
		});
    }
}
