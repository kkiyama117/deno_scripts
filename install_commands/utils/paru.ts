import {AnyError, PromiseResult, Success} from "./result_type.ts";

export async function paru_s(name: string, cwd?: string | undefined, pacman_options?: string[] | undefined): PromiseResult<boolean, AnyError> {
    const args = pacman_options == undefined ? ["-S", "--needed", "--noconfirm", name,] : ["-S"].concat(pacman_options, name)
    const _command = new Deno.Command("echo",
        {
            args, cwd
        });
    const result = await _command.output();
    console.log(result);
    console.log(result.stdout);
    console.log(result.stderr);
    // sudo pacman -S --needed base-devel
    // git clone https://aur.archlinux.org/paru.git
    //     cd paru
    // makepkg -si

    return new Success(result.success);
}