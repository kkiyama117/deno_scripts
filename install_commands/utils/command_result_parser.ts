import {AnyError, PromiseResult, Result, Success,} from "./result_type.ts";


export function instanceOfCommandOutput(object: any): object is Deno.CommandOutput {
    return 'stdout' in object && 'stderr' in object;
}

export async function _read_command_stream(base: ReadableStream, output: WritableStream): PromiseResult<undefined, AnyError> {
    const data = base.pipeThrough(new TextDecoderStream()).pipeTo(output);
    // for await (const line of csv) {
    //     console.log(line);
    //     prompt("次の行に進みますか？"); // ここでエンターキーを押すと次の行に行く
    // }
    return new Success();
}

// export function parse_command_out(base: Uint8Array): Result<string, AnyError> {
//     return new Success(new TextDecoder().decode(base));
// }

export function console_command_out(base: Uint8Array): Result<undefined, AnyError> {
    console.log(new TextDecoder().decode(base));
    return new Success();
}

export async function write_commnand_out(base: Uint8Array, file_path: string): PromiseResult<undefined, AnyError> {
    const _log_path = Deno.cwd() + "/logs/"
    console.log();
    await Deno.writeTextFile(_log_path + file_path, new TextDecoder().decode(base), {append: true});
    return new Success();
}
