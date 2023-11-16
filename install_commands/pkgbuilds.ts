// see https://wiki.archlinux.jp/index.php/PKGBUILD
// https://kmyk.github.io/blog/blog/2015/09/19/how-to-make-packages-of-arch-linux/

// import { parse } from "https://deno.land/std/flags/mod.ts";

function __filename(): String {
    return new URL("", import.meta.url).pathname;
}

function __dirname(): String {
    return new URL(".", import.meta.url).pathname;
}

export async function create_pkg(pkg_name: string): Promise<boolean> {
    console.log(__filename());
    console.log(__dirname());
    return true;
    // const command = new Deno.Command("makepkg", {
    //         args: [],
    //         cwd: Deno.execPath(),
    //     }
    // )
    // const {code, stdout, stderr} = await command.output();
}