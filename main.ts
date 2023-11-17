import {hoge, install_paru} from "./install_commands/installer.ts"
import CommandOutput = Deno.CommandOutput;
import {instanceOfCommandOutput, write_commnand_out} from "./install_commands/utils/command_result_parser.ts";

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
        if (_os == "arch") {
            const result_install_paru = await install_paru();
            if (result_install_paru.isSuccess()) {
                const results: CommandOutput[] = result_install_paru.value;
                for (const result in results) {
                    if (instanceOfCommandOutput(result)) {
                        await write_commnand_out(result.stdout, "install_paru.log");
                        await write_commnand_out(result.stderr, "install_paru.log");
                    }
                }
            }
            console.log("paru successfully installled!");
        } else {
            console.error("install paru failed!");
        }
    }
}
