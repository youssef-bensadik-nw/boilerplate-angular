export abstract class StoragePort {
	abstract getItem(key: string): string | undefined;
	abstract setItem(key: string, value: string): void;
}
