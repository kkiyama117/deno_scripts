import {paru_s} from "./utils/paru.ts";
import {AnyError, PromiseResult, Success} from "./utils/result_type.ts";
import CommandOutput = Deno.CommandOutput;

export async function hoge(): PromiseResult<boolean, AnyError> {
    console.log("Running installer.ts")
    return new Success(true);
    // return paru_s("webstorm-eap", Deno.cwd());
}

export async function install_paru(): PromiseResult<CommandOutput[], AnyError> {
    const _cache_path = Deno.cwd() + "/.cache";
    const _cache_paru_path = _cache_path + "/paru";
    const result: CommandOutput[] = [];

    const _install_base_devel = await new Deno.Command("sudo",
        {
            args: ["pacman", "-S", "--needed", "--noconfirm", "base-devel"], cwd: Deno.cwd()
        }).output();

    console.log(_cache_path);
    const _clone = await new Deno.Command("git",
        {
            args: ["clone", "https://aur.archlinux.org/paru.git", _cache_paru_path, "--depth=1"], cwd: Deno.cwd()
        }).output();
    const _makepkg = await new Deno.Command("makepkg",
        {
            args: ["-s"], cwd: _cache_paru_path
        }).output();
    const _version = "1.11.1";
    const _install = await new Deno.Command("sudo",
        {
            args: ["pacman", "-U", "--needed", "--noconfirm", "paru-" + _version + "-1-x86_64.pkg.tar.zst"],
            cwd: _cache_paru_path
        }).output();
    result.push(_install_base_devel, _clone, _makepkg, _install);
    return new Success(result);
}
