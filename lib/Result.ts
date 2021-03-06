import {Exception} from "./Exception.ts";

export interface ResultOk<T> {
    isError: false,
    value: T
}

export interface ResultErr {
    isError: true,
    error: Error,
    exception: Exception,
    data: object
}

export type Result<T> = ResultErr | ResultOk<T>;

export function Ok<T>(value: T): ResultOk<T> {
    return {
        isError: false,
        value
    };
}

export function Err(exception: Exception, data: object = {}): ResultErr {
    return {
        isError: true,
        error: new Error(exception.errorMessage),
        exception,
        data: {...data}
    };
}

export function isOk<T>(val: Result<T>): val is ResultOk<T> {
    return val.isError === false;
}

export function isErr<T>(val: Result<T>): val is ResultErr {
    return val.isError === true;
}

export function ifOk<T>(val: Result<T>, cb: (v: T) => void): void {
    if(isOk(val)) {
        cb(val.value);
    }
}

export function ifErr<T>(val: Result<T>, cb: (v: Exception) => void): void {
    if(isErr(val)) {
        cb(val.exception);
    }
}
