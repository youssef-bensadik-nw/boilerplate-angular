import { inject } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { LoggerPort } from "~common/domain/ports/logger.port";

type LoggerMethod = "info" | "warn" | "error" | "debug" | "fatal";

export class LoggerAdapter implements LoggerPort {

	private readonly logger = inject(NGXLogger);
	private log<T>(method: LoggerMethod, message: T, args: unknown[]): void {
		if (args && args.length) {
			this.logger[method](message, ...args);
		} else {
			this.logger[method](message);
		}
	}

	public info<T>(message: T, ...args: unknown[]): void {
		this.log("info", message, args);
	}

	public warn<T>(message: T, ...args: unknown[]): void {
		this.log("warn", message, args);
	}

	public error<T>(message: T, ...args: unknown[]): void {
		this.log("error", message, args);
	}

	public debug<T>(message: T, args: unknown[]): void {
		this.log("debug", message, args);
	}

	public fatal<T>(message: T, ...args: unknown[]): void {
		this.log("fatal", message, args);
	}


}
