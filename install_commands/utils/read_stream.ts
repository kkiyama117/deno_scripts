import {AnyError, PromiseResult, Result, Success,} from "./result_type.ts";


export async function _read_command_stream(base: ReadableStream, output: WritableStream): PromiseResult<undefined, AnyError> {
    const data = base.pipeThrough(new TextDecoderStream()).pipeTo(output);
    // for await (const line of csv) {
    //     console.log(line);
    //     prompt("次の行に進みますか？"); // ここでエンターキーを押すと次の行に行く
    // }
    return new Success();
}

export function parse_command_out(base: Uint8Array): Result<String, AnyError> {
    return new Success(new TextDecoder().decode(base));
}

export function read_command_out(base: Uint8Array): Result<undefined, AnyError> {
    console.log(parse_command_out(base));
    return new Success();
}
