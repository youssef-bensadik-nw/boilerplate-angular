---
to: generated/default-locale-type.g.ts
force: true
---
import defaultTranslationJson from "../../../public/<%= translationPath %>/<%= defaultLocale %>.json";

type DeepReadonly<T> = {
	readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
export type TranslationKeys = DeepReadonly<typeof defaultTranslationJson>;
