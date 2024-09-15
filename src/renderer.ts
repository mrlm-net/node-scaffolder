import fs from "fs";
import * as glob from "glob";
import Mustache from "mustache";

export interface IRenderer {
    render(template: string, data: any): string;
    renderBatch(templates: string[], data: any): string;
}

export default class Renderer implements IRenderer {
    render(template: string, data: any): string {
        const content = fs.readFileSync(`./${template}`, "utf8");
        return Mustache.render(content, data);
    }

    renderBatch(templates: string[], data: any): string {
        return templates
            .map(template => this.render(template, data))
            .join("\n");
    }

    renderFolder(folder: string, data: any): string {
        return glob.globSync(folder).map((file: any) => this.render(file, data)).join("\n");
            
    }
}

export {
    Renderer
};