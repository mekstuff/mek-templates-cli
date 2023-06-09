#!/usr/bin/env node

import fs from "fs";
import path from "path";

import { Command } from "commander";
const program = new Command();

const DEFAULT_LOCAL_PATH = "C:/Users/Lanzo/Documents/Github/Mekstuff/mektemplates";

async function initaction(templateName:string, targetName:string, options:{localPath: string}){

    const targetPath = path.join(options.localPath,templateName)
    const pathExist = fs.existsSync(targetPath)
    if(!pathExist){
        console.warn(`"${templateName}" is not a valid template name.`);
        process.exit(1);
    }
    const endPath = path.join(process.cwd(),targetName);
    const endPathExists = fs.existsSync(endPath);
    if(endPathExists){
        console.warn(`"${targetName}" directory already exists in ${process.cwd()}`);
        process.exit(1);
    }
    fs.cpSync(targetPath, endPath, {recursive:true});
    console.log(`[MekTemplates] cloned ${templateName}`)
}

program.command("init <templateName> <targetName>")
.option("--localPath", "local path where mektemplates files are located", DEFAULT_LOCAL_PATH)
.action(initaction)

program.parse();
