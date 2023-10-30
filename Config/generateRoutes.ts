import fs from 'fs/promises'
import * as core from 'express-serve-static-core';
import path from 'path';

export async function GenerateRoutes(): Promise<core.Express[]> {
    let modules = await generateModulesRoutes()
    return [
        ...modules,
        // ...generateClientRoutes()
    ]
}

async function generateModulesRoutes(): Promise<core.Express[]> {
    let files = await getAllFilesPath(path.resolve(__dirname, "..", "Modules"))

    let routes = files.filter((item) => item.includes(".route."))

    let result: core.Express[] = []

    for await (let item of routes) {
        let imported = await import(item)

        result.push(...Object.values<core.Express>(imported))
    }

    return result
}

async function getAllFilesPath(path: string): Promise<string[]> {
    let dir = await fs.readdir(path)

    let files = []
    for await (let item of dir) {
        let stats = await fs.stat(`${path}/${item}`)

        if (stats.isFile()) {
            files.push(`${path}/${item}`)
        }

        if (stats.isDirectory()) {
            let filesFromDir = await getAllFilesPath(`${path}/${item}`)
            files.push(...filesFromDir)
        }
    }

    return files
}