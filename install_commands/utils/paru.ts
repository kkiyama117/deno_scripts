import {AnyError, PromiseResult, Success, unwrap} from "./result_type.ts";
import {read_command_out} from "./read_stream.ts";

export async function paru_s(name: string, cwd?: string | undefined, pacman_options?: string[] | undefined): PromiseResult<boolean, AnyError> {
    const args = pacman_options == undefined ? ["-S", "--needed", "--noconfirm", name,] : ["-S"].concat(pacman_options, name)
    console.log(args,cwd);
    const _command = new Deno.Command("echo",
        {
            args, cwd
        });
    const result = await _command.output();
    // sudo pacman -S --needed base-devel
    // git clone https://aur.archlinux.org/paru.git
    //     cd paru
    // makepkg -si
    if (result.stderr.length == 0) {
        console.error(unwrap(read_command_out(result.stderr)));
    } else {
        console.log(read_command_out(result.stdout));
    }

    return new Success(result.success);
}