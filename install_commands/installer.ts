import {paru_s} from "./utils/paru.ts";
import {AnyError, Failure, PromiseResult, Success} from "./utils/result_type.ts";
import CommandOutput = Deno.CommandOutput;
import {write_commnand_out} from "./utils/command_result_parser.ts";

export async function hoge(): PromiseResult<boolean, AnyError> {
    console.log("Running installer.ts")
    return new Success(true);
    // return paru_s("webstorm-eap", Deno.cwd());
}

export async function install_paru(): PromiseResult<undefined, AnyError> {
    const _cache_path = Deno.cwd() + "/.cache";
    const _cache_paru_path = _cache_path + "/paru";

    console.log("Install base-devel");
    const _install_base_devel = await new Deno.Command("sudo",
        {
            args: ["pacman", "-S", "--needed", "--noconfirm", "base-devel"], cwd: Deno.cwd()
        }).output();
    await _write_log(_install_base_devel);

    console.log("clone paru");
    const _clone = await new Deno.Command("git",
        {
            args: ["clone", "https://aur.archlinux.org/paru.git", _cache_paru_path, "--depth=1"], cwd: Deno.cwd()
        }).output();
    await _write_log(_clone);

    console.log("makepkg paru");
    const _makepkg = await new Deno.Command("makepkg",
        {
            args: ["-s"], cwd: _cache_paru_path
        }).output();
    await _write_log(_makepkg);

    console.log("install paru");
    const _version = "1.11.1";
    const _install = await new Deno.Command("sudo",
        {
            args: ["pacman", "-U", "--needed", "--noconfirm", "paru-" + _version + "-1-x86_64.pkg.tar.zst"],
            cwd: _cache_paru_path
        }).output();
    await _write_log(_install);
    if (_install.success){
        return new Success();
    }else {
        return new Failure(new AnyError);
    }
}

async function _write_log(_out: CommandOutput): PromiseResult<undefined, AnyError> {
    const file_path = "install_paru.log"
    const file_path2 = "install_paru_error.log"
    await write_commnand_out(_out.stdout, file_path);
    return await write_commnand_out(_out.stderr, file_path2);
}