import type { ElementAttribute } from "~common/domain/types/ElementAttribute";

export abstract class BodyPort {
	abstract setAttribute(attr: ElementAttribute, value: string): void;
}
