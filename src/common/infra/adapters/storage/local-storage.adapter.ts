import { StoragePort } from "~common/domain/ports/storage";

export class LocalStorageAdapter implements StoragePort {

    public getItem(key: string): string | undefined {
		return localStorage.getItem(key) ?? undefined;
    }

    public setItem(key: string, value: string): void {
		return localStorage.setItem(key, value);
    }

}
