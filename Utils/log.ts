import fs from "fs/promises";
import { Utils } from "./utils";

// Modulo de logs, com funções para ler e escrever nos logs, gerenciamento de fila de log
export namespace Log {

    const caminhoLogs = `${process.cwd()}/Logs/`
    const filaLogs: Array<{ tipo: `${TiposLogs}`, log: Log }> = []

    export function insertLog(newLog: Log, tipo: `${TiposLogs}` = "default") {
        filaLogs.push({ tipo, log: newLog })

        Utils.debouncer("logs", 10, async () => {

            await fs.mkdir("./Logs", { recursive: true })

            while (filaLogs.length !== 0) {
                let item = filaLogs.pop()

                if (!item) return

                let logs = await readLogs(item.tipo) || {}

                let propName = `${new Date().toLocaleString('pt-br')} - ${Date.now()}`
                logs = {
                    [propName]: item.log,
                    ...logs
                }

                await fs.writeFile(`${caminhoLogs}/${tipo}.json`, JSON.stringify(logs, null, 2), "utf-8")
                await Utils.sleep(10)
            }
        })
    }

    export async function readLogs(tipo: `${TiposLogs}` = "default"): Promise<Record<string, Log> | null> {
        let json = await Utils.readFile(`${caminhoLogs}/${tipo}.json`, "utf-8")

        if (!json || typeof json !== "string") {
            return null
        }

        return JSON.parse(json)
    }
}

type Log = {
    msg: string
    metodo?: string
    rota?: string
    user_id?: number
    stack?: string[]
    data?: any
    fullError?: any
}

enum TiposLogs {
    default = "default",
    device = "device"
}