import Renderer from "../renderer";

export const name = "file";

export async function handler(): Promise<void> {
    console.log("Hello, world! from CMS file");
    const engine = new Renderer();
    
    console.log(engine.render("./tempbin/package.json", { name: "MRLM TEST" }));
}