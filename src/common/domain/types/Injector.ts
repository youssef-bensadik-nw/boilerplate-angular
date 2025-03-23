import type { AbstractType } from "~common/domain/types/AbstractType";

export interface Injector {
	get<T>(symbol: AbstractType<T>): T;
}
