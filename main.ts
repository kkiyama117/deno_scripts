import {hoge,install_paru} from "./install_commands/installer.ts"

// export function add(a: number, b: number): number {
//   return a + b;
// }

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Running main.ts")
    const _command = Deno.args[0];
    const _os = Deno.args[1];
    console.log("OS is " + _os);
    // installer
    if (_command == "install") {
        console.log("running install scripts")
        if (_os == "arch"){
            await install_paru();
        }
    }
}
