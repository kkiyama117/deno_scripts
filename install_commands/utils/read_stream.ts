import {AnyError, Result, Success,} from "./result_type.ts";


export function _read_stream(base: String): Result<undefined, AnyError> {
    return new Success();
}