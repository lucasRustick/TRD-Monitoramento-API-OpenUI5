import { NextFunction, Request, Response } from "express"
import { Log } from "./log"
import { Utils } from "./utils"

type ExpressPromise = (req: Request, res: Response, next?: NextFunction) => Promise<void>

//  Modulo de async handler
export function AsyncHandler(callback: ExpressPromise) {

    return function (req: Request, res: Response, next: NextFunction) {

        callback(req, res, next).catch((error: Error) => {

            // Trata o erro passando ele para o console e adicionando pontos especificos ao arquivo log.json através da função adicionarLog

            let locals = Utils.getLocals(res)

            console.log(error)
            Log.insertLog({
                rota: req.originalUrl,
                metodo: req.method,
                msg: error.toString(),
                stack: error.stack?.split("\n"),
                user_id: locals.user_id,
                data: req.body,
                fullError: error
            })

            // Retorna a requisição para o cliente
            res.status(500).json(error.toString())
        })
    }
}