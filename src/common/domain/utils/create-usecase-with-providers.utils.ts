import { Provider } from "~common/domain/types/Provider";
import { Injectable } from "~common/domain/utils/Injectable";
import { TestsInjector } from "~common/domain/utils/TestsInjector";

export function createUseCaseWithProviders<T extends Injectable>({ useCase, providers }: { useCase: new () => T, providers: Array<Provider<any>> }): T {
	const originalInjector = (Injectable as any).ɵinjector;
	const fakesInjector = new TestsInjector(providers);
	(Injectable as any).ɵinjector = fakesInjector;
	const instance = new useCase();
	(Injectable as any).ɵinjector = originalInjector;
	return instance;
}
