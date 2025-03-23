import type { LocaleDirection } from "~features/i18n/domain/types/LocaleDirection";
import type { DirectionChangeHandler } from "~features/i18n/domain/types/DirectionChangeHandler";

type DirectionChangeHandlerCtor = new (dir: LocaleDirection) => DirectionChangeHandler;
export const createDirectionChangeHandler = (ctor: DirectionChangeHandlerCtor, dir: LocaleDirection) => new ctor(dir)
