import type { BodyPort } from "~common/domain/ports/body";
import type { ElementAttribute } from "~common/domain/types/ElementAttribute";

export class WebBodyAdapter implements BodyPort {
    public setAttribute(attr: ElementAttribute, value: string): void {
		document.body.setAttribute(attr, value);
    }
}
