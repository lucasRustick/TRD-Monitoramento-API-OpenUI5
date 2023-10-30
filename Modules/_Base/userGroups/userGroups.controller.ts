import { Request, Response } from "express"
import { Base_UserGroups_model } from "./userGroups.model"
import { Base_UserGroupTypes_model } from "../userGroupsTypes/userGroupsTypes.model"

// Armazena funções de usuarios como validação de Login validação de token
export class class_Base_User_Groups_controller {

    getAllActiveToRegister = async (req: Request, res: Response) => {
        res.json(await Base_UserGroups_model.getAllActiveToRegister())
    }

    getGroupTypes = async (req: Request, res: Response) => {
        res.json(await Base_UserGroupTypes_model.getAllActive())
    }

    create = async (req: Request, res: Response) => {
        res.json(await Base_UserGroups_model.create(req.body))
    }

    update = async (req: Request, res: Response) => {
        res.json(await Base_UserGroups_model.update(parseInt(req.params.IdUserGroup), req.body))
    }

    delete = async (req: Request, res: Response) => {
        res.json(await Base_UserGroups_model.delete(parseInt(req.params.IdUserGroup)))
    }

}

export const Base_User_Groups_controller = new class_Base_User_Groups_controller()