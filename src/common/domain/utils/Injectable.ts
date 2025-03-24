import type { Injector } from "~common/domain/types/Injector";
import type { AbstractType } from "~common/domain/types/AbstractType";

export abstract class Injectable {

	private static readonly ɵinjector: Injector;

	protected inject<T>(symbol: AbstractType<T>): T {
		return Injectable.ɵinjector.get(symbol);
	}
}
