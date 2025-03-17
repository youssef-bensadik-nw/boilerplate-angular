export type CallableLeaf<T> = {
	[K in keyof T]: T[K] extends object
		? CallableLeaf<T[K]>
		: string & ((args: Record<string, string>) => T[K]);
};
