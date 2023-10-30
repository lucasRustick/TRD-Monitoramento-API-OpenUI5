import { Request, Response } from "express"
import { Md5 } from 'ts-md5'
import { Base_PasswordRecovery_model } from "./passwordRecovery.model"
import { Base_User_model } from "../users/users.model"

// Armazena funções de usuarios como validação de Login validação de token
export class class_Base_Password_Recovery_controller {

    getAllActiveAndPending = async (req: Request, res: Response) => {
        res.json(await Base_PasswordRecovery_model.getAllActiveAndPending())
    }

    create = async (req: Request, res: Response) => {
        let user = await Base_User_model.getByLogin(req.params.login)

        if (!user) {
            res.status(406).json({ msg: "O Login informado não é válido!" })
            return
        }

        res.json(await Base_PasswordRecovery_model.create({ IdUser: user.IdUser }))
    }

    update = async (req: Request, res: Response) => {
        let status = req.params.status === "true"

        await Base_PasswordRecovery_model.updateStatus(parseInt(req.params.IdPasswordRecovery), status)

        if (!status) {
            res.sendStatus(200)
            return
        }

        let passRecord = await Base_PasswordRecovery_model.getUnique(parseInt(req.params.IdPasswordRecovery))

        await Base_User_model.update(passRecord.IdUser, { Password: Md5.hashStr("123456") })

        res.sendStatus(200)
    }
}

export const Base_Password_Recovery_controller = new class_Base_Password_Recovery_controller()