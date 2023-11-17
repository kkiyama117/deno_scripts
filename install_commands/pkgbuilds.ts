// see https://wiki.archlinux.jp/index.php/PKGBUILD
// https://kmyk.github.io/blog/blog/2015/09/19/how-to-make-packages-of-arch-linux/

// import { parse } from "https://deno.land/std/flags/mod.ts";
export async function create_pkg(pkg_name: string): Promise<boolean> {
    return true;
    // const command = new Deno.Command("makepkg", {
    //         args: [],
    //         cwd: Deno.execPath(),
    //     }
    // )
    // const {code, stdout, stderr} = await command.output();
}