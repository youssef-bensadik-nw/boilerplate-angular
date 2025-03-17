import type { I18nConfig } from "../types";
import type { LocaleResolver } from "./LocaleResolver";

type LocaleResolverCtor = new (config: I18nConfig) => LocaleResolver;
export const createResolver = (ctor: LocaleResolverCtor, config: I18nConfig) => new ctor(config);
