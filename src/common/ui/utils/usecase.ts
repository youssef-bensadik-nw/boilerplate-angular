import { inject, ProviderToken, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { isObservable, Observable, of } from "rxjs";

type Query<TOut> = Signal<TOut>;
type Command<TIn, TOut> = (command: TIn) => Signal<TOut>;

export function usecase<
	H extends { handle: (...args: any[]) => any },
	P extends Parameters<H['handle']>,
	R = ReturnType<H['handle']>,
	T = R extends Observable<infer U> ? U : R,
>(token: ProviderToken<H>): P extends [infer A] ? Command<A, T> : (P extends [] ? Query<T> : never) {
	const instance = inject(token);
	if (!instance.handle.length) {
		const result = instance.handle();
		const observable = isObservable(result) ? result : of(result);
		return toSignal(observable) as any;
	}
	return ((command: unknown) => {
		const result = instance.handle(command);
		const observable = isObservable(result) ? result : of(result);
		return () => toSignal(observable);
	}) as any;
}
