import type { AbstractType } from "~common/domain/types/AbstractType";

export interface Provider<T> {
	provide: AbstractType<T>;
	useValue: T;
}
