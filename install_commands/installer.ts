// const p = Deno.Command({cmd: ["echo", "abcd"]});
import {paru_s} from "./utils/paru.ts";
import {AnyError, PromiseResult, Success} from "./utils/result_type.ts";

export async function hoge(): PromiseResult<boolean,AnyError> {
    console.log("Running installer.ts")
    return new Success(true);
}

export async function install_paru(): PromiseResult<boolean, AnyError> {

    // const _install_base_devel = new Deno.Command("sudo",
    //     {
    //         args: []
    //
    //     });
    // sudo pacman -S --needed base-devel
    // git clone https://aur.archlinux.org/paru.git
    //     cd paru
    // makepkg -si
    // return true;
    return paru_s("hoge");
}