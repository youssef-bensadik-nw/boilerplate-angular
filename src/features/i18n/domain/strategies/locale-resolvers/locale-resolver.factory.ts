import type { I18nConfig } from "~features/i18n/domain/types/I18nConfig";
import type { LocaleResolver } from "~features/i18n/domain/types/LocaleResolver";

type LocaleResolverCtor = new (config: I18nConfig) => LocaleResolver;
export const createResolver = (ctor: LocaleResolverCtor, config: I18nConfig) => new ctor(config);
