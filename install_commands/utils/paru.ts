import {AnyError, PromiseResult, Success, unwrap} from "./result_type.ts";
import {parse_command_out, read_command_out} from "./command_result_parser.ts";

export function paru_s(name: string, cwd?: string | undefined, pacman_options?: string[] | undefined): PromiseResult<boolean, AnyError> {
    // sudo pacman -S --needed base-devel
    // git clone https://aur.archlinux.org/paru.git
    //     cd paru
    // makepkg -si
    const args = pacman_options == undefined ? ["-S", "--needed", "--noconfirm", name,] : ["-S"].concat(pacman_options, name)
    return _paru(args, cwd)
}

export function paru_u(file: string, cwd?: string | undefined, pacman_options?: string[] | undefined): PromiseResult<boolean, AnyError> {
    const args = pacman_options == undefined ? ["-U", "--needed", "--noconfirm", file,] : ["-U"].concat(pacman_options, file)
    return _paru(args, cwd)
}

export async function _paru(args: string[], cwd?: string | undefined): PromiseResult<boolean, AnyError> {
    console.log(args, cwd);
    const _command = new Deno.Command("paru",
        {
            args, cwd,
        });
    const result = await _command.output();
    // sudo pacman -S --needed base-devel
    // git clone https://aur.archlinux.org/paru.git
    //     cd paru
    // makepkg -si
    if (result.code != 0) {
        console.error(unwrap(parse_command_out(result.stderr)));
        console.log(unwrap(parse_command_out(result.stdout)));
    } else {
        console.log(unwrap(parse_command_out(result.stdout)));
    }

    return new Success(result.success);
}
