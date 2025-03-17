import type { LocaleDirection } from "../types";
import type { DirectionChangeHandler } from "./DirectionChangeHandler";

type DirectionChangeHandlerCtor = new (dir: LocaleDirection) => DirectionChangeHandler;
export const createDirectionChangeHandler = (ctor: DirectionChangeHandlerCtor, dir: LocaleDirection) => new ctor(dir)
