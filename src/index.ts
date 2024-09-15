#!/usr/bin/env node
import { Console } from "./console"
import { Renderer } from "./renderer"

(async ()  => {
    const cli = new Console()
    await cli.execute()        
})(); 

export {
    Console,
    Renderer
}

