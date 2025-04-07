import type { AbstractType } from "~common/domain/types/AbstractType";
import type { Injector } from "~common/domain/types/Injector";
import type { Provider } from "~common/domain/types/Provider";

export class TestsInjector implements Injector {
	private readonly fakesMap = new Map<AbstractType<any>, any>();

	constructor(providers: Array<Provider<any>>) {
		providers.forEach(provider => {
			this.fakesMap.set(provider.provide, provider.useValue);
		});
	}

	get<T>(symbol: AbstractType<T>): T {
		if (this.fakesMap.has(symbol)) {
			return this.fakesMap.get(symbol);
		}
		throw new Error(`No provider found for ${symbol.name || String(symbol)}`);
	}
}
