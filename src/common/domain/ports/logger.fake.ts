import { LoggerPort } from "./logger.port";

type LogRecord = {
	type: "debug" | "info" | "warn" | "error" | "fatal";
	message: unknown;
	args: unknown[];
}

export class LoggerFake implements LoggerPort {

	private readonly _logs: LogRecord[] = [];
	public get logs(): LogRecord[] {
		return this._logs;
	}

	debug<T>(message: T, ...args: unknown[]): void {
		this._logs.push({ type: "debug", message, args });
	}

    info<T>(message: T, ...args: unknown[]): void {
		this._logs.push({ type: "info", message, args });
    }
    warn<T>(message: T, ...args: unknown[]): void {
		this._logs.push({ type: "warn", message, args });
    }
    error<T>(message: T, ...args: unknown[]): void {
		this._logs.push({ type: "error", message, args });
    }
    fatal<T>(message: T, ...args: unknown[]): void {
		this._logs.push({ type: "fatal", message, args });
    }
}
