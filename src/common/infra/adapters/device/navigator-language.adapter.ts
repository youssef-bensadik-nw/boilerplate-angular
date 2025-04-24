import type { DeviceLanguagePort } from "~common/domain/ports/device";

export class NavigatorLanguageAdapter implements DeviceLanguagePort {

    public getLanguage(): string | null {
		return (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || null;
    }

}
