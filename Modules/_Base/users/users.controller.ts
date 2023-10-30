import { Base_AcessControl } from './sections/AcessControl.section'
import { NextFunction, Request, Response } from "express"
import { Base_User_model } from './users.model'
import { Utils } from 'root/Utils/utils'

// Armazena funções de usuarios como validação de Login validação de token
export class class_Base_Users_controller {

    validateLogin = async (req: Request, res: Response) => {

        let { login, password } = req.params

        let user = await Base_User_model.getByLoginAndPassword(login, password)

        if (user) {
            res.json({ token: Base_AcessControl.generateToken(user.IdUser) })
            return
        }

        res.status(401).json({ msg: "Login inválido" })
    }

    acessMiddleware = (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers['authorization']

        if (!token) {
            res.status(401).send()
            return
        }

        let result = Base_AcessControl.verifyJwtToken(token)

        if (!result) {
            res.status(401).send()
            return
        }

        res.locals.user_id = result.id

        next()
    }

    getAllActiveToRegister = async (req: Request, res: Response) => {
        res.json(await Base_User_model.getAllActiveToRegister())
    }

    getSelf = async (req: Request, res: Response) => {
        let locals = Utils.getLocals(res)

        res.json(await Base_User_model.getSingleUserWithGroup(locals.user_id))
    }

    create = async (req: Request, res: Response) => {
        res.json(await Base_User_model.create(req.body))
    }

    update = async (req: Request, res: Response) => {
        res.json(await Base_User_model.update(parseInt(req.params.IdUser), req.body))
    }

    updatePassword = async (req: Request, res: Response) => {
        let locals = Utils.getLocals(res)

        res.json(await Base_User_model.update(locals.user_id, { Password: req.params.newPassword }))
    }

    delete = async (req: Request, res: Response) => {
        res.json(await Base_User_model.delete(parseInt(req.params.IdUser)))
    }
}

export const Base_Users_controller = new class_Base_Users_controller()