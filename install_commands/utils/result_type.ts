/// Result Type
///
/// https://qiita.com/frozenbonito/items/e708dfb3ab7c1fd3824d
export type Result<T, E extends Error> = Success<T> | Failure<E>;
export type PromiseResult<T, E extends Error> = Promise<Result<T, E>>;


/**
 * @Deprecated
 */
export class AnyError extends Error {

}

export class Success<T> {
    readonly value: T;

    constructor(value?: T)
    constructor(value: T) {
            this.value = value;
    }

    isSuccess(): this is Success<T> {
        return true;
    }

    isFailure(): this is Failure<Error> {
        return false;
    }
}

export class Failure<E extends Error> {
    readonly error: E;

    constructor(error: E) {
        this.error = error;
    }

    isSuccess(): this is Success<unknown> {
        return false;
    }

    isFailure(): this is Failure<E> {
        return true;
    }
}

export function tryCatch<T, E extends Error>(
    func: () => T,
    // 発生する例外は any なので適切な型に変換するための
    // 関数を与える。
    onCatch: (e: unknown) => E
): Result<T, E> {
    try {
        const value = func();
        return new Success<T>(value);
    } catch (err) {
        return new Failure<E>(onCatch(err));
    }
}

export async function tryCatchAsync<T, E extends Error>(
    func: () => Promise<T>,
    // 発生する例外は any なので適切な型に変換するための
    // 関数を与える。
    onCatch: (e: unknown) => E
): PromiseResult<T, E> {
    try {
        const value = await func();
        return new Success<T>(value);
    } catch (err) {
        return new Failure<E>(onCatch(err));
    }
}

export function unwrap<T, E extends Error>(result: Result<T, E>): T {
    if (result.isFailure()) {
        throw result.error;
    }
    return (result as Success<T>).value;
}

// class Result<T, E extends Error> {
//     private readonly value: T | E;
//
//     private constructor(value: T | E) {
//         this.value = value;
//     }
//
//     static success<T>(value: T): Result<T, Error> {
//         return new Result<T, Error>(value);
//     }
//
//     static failure<E extends Error>(error: E): Result<any, E> {
//         return new Result<any, E>(error);
//     }
//
//     when({
//              success,
//              failure,
//          }: {
//         success: (data: T) => any;
//         failure: (error: E) => any;
//     }) {
//         if (this.value instanceof Error) {
//             return failure(this.value);
//         } else {
//             return success(this.value);
//         }
//     }
// }
