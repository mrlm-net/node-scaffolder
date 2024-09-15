import fs from "fs";
import path from "path";
import * as FileCommand from "./commands/file";
import * as FolderCommand from "./commands/folder";

export interface Command {
    name: string;
    aliases?: string[];
    handler: () => Promise<void>;
}

export interface ConsoleConfig {
    templatePaths: string[];
}

export default class Console {
    private command: string|undefined;

    constructor(private config?: ConsoleConfig) {
        console.log("Hello, world!", process.argv);
        if (!this.hasCommandBeenSpecified()) {
            throw new Error("No command specified");
        }
    }

    public async execute(): Promise<void> {
        const modulePath: string = `./src/commands/${this.command}.ts`;
        console.log("Hello, world I.!", modulePath);
        // TODO test edge cases
        if (fs.existsSync(modulePath)) {
            switch (this.command) {
                case "file":
                    await FileCommand.handler();
                    break;
                case "folder":
                    await FolderCommand.handler()
                    break;
                default:
                    throw new Error("Command interface not implemented!");
            }
        }
    }

    private hasCommandBeenSpecified(): boolean {
        this.command = process.argv.slice(2).find(arg => !arg.startsWith("--") || !arg.startsWith("-"));
        return this.command ? true : false;
    }
}

export {
    Console
};