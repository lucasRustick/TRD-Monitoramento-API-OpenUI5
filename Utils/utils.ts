import fs from "fs/promises";
import { Response } from "express";
import { config } from 'dotenv'

//  Funções de utilidades do projeto, como tratativas de erros, sleep e Resolvers
export namespace Utils {

    let debouncerList: Record<string, NodeJS.Timeout> = {}

    export async function readFile(...filePath: Parameters<typeof fs.readFile>) {
        try {
            return await fs.readFile(...filePath)
        } catch (error: any) {
            if (error.toString().includes("no such file or directory")) {
                return null
            }

            throw error
        }
    }

    export function debouncer(name: string, time: number, fn: (...params: any[]) => void, ...params: any[]) {
        clearTimeout(debouncerList[name])

        debouncerList[name] = setTimeout(fn, time, ...params)
    }

    export function sleep(time: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, time)
        })
    }

    export function getLocals(res: Response): Locals {
        return res.locals as Locals
    }

    export function configEnv() {
        config({ path: process.env.NODE_ENV === "test" ? "./.env.test" : "./.env" })
    }

    export async function resolveObjectPromises<T extends Record<string, Promise<any>>>(promises: T): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
        let arrayPromisses = Object.values(promises)
        let resultPromisses = await Promise.all(arrayPromisses)

        let body = {} as { [K in keyof T]: Awaited<T[K]> }
        for (let i = 0; i < resultPromisses.length; i++) {
            const key = Object.keys(promises)[i] as keyof T

            body[key] = resultPromisses[i];
        }

        return body
    }
}

export type Locals = {
    user_id: number
}