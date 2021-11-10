import isEmpty from "lodash/isEmpty";
import isUndefined from "lodash/isUndefined";
import mapValues from "lodash/mapValues";
import omitBy from "lodash/omitBy";
import { Composer, Errors, ObjectMap, Rule, Rules, Validator } from "./types";

export const required = (value: any) => !!value && !isEmpty(value);

export const email = (value: any) => !isEmpty(value) && /\S+@\S+\.\S+/.test(value);

export const composeRules = <V extends ObjectMap, K extends keyof V>(rules: ObjectMap<Rule<V, K>>): Composer<V, K> => (
    (value: V[K], data: V) => {
        for (const key in rules) {
            if (rules.hasOwnProperty(key) && !rules[key](value, data)) {
                return key;
            }
        }
    }
);

export const makeValidator = <V extends ObjectMap>(rules: Rules<V>): Validator<V> => (
    (values: V): Errors => {
        const keys = mapValues(rules, (rule: Rule<V>, key) => {
            return rule(values[key], values);
        });

        const errors = omitBy(keys, isUndefined);

        return isEmpty(errors) ? undefined : errors;
    }
);
