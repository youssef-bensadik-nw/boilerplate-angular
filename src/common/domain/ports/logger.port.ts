export abstract class LoggerPort {
	abstract debug<T>(message: T, ...args: unknown[]): void;
	abstract info<T>(message: T, ...args: unknown[]) : void;
	abstract warn<T>(message: T, ...args: unknown[]) : void;
	abstract error<T>(message: T, ...args: unknown[]): void;
	abstract fatal<T>(message: T, ...args: unknown[]): void;
}
