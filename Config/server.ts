import express from 'express'
import cors from 'cors'
import { Log } from '../Utils/log'
import { GenerateRoutes } from './generateRoutes'

class Server {

    readonly app = express()

    private appLoaded = false

    constructor() {
        this.middlewares()
        this.routes()
    }

    private middlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }

    private async routes() {

        this.app.get("/", (req, res) => {
            res.send("<h1>API BASE Funcionando</h1>")
        })

        this.app.post('/logs', async (req, res) => {
            Log.insertLog(req.body)

            res.send("Sucesso")
        })

        this.app.use(await GenerateRoutes())
        this.appLoaded = true
    }

    public appLoad() {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
                if (this.appLoaded) {
                    clearInterval(interval)
                    resolve(true)
                }
            })
        })
    }
}

export const server = new Server()