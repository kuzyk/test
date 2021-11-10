import {ValidationErrors} from "final-form";

export type ObjectMap<T = any> = {
    [key: string]: T;
}

export type Errors = ValidationErrors | Promise<ValidationErrors> | undefined;

export type Validator<V extends ObjectMap> = (values: V) => Errors;

export type Composer<V extends ObjectMap, K extends keyof V> = (value: V[K], values: V) => string | undefined;

export type Rule<V extends ObjectMap = ObjectMap, K extends keyof V = keyof V> = (value: V[K], values: V) => boolean;

export type Rules<V extends ObjectMap> = {
    [K in keyof V]?: Composer<V, K> | Validator<V[K]>
}
