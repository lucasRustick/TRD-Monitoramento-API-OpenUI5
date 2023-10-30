import { Request, Response } from "express"
import { BASE_Companys_model } from "./companys.model"

export class class_Base_Companys_controller {

    getAllActive = async (req: Request, res: Response) => {
        res.json(await BASE_Companys_model.getAllActive())
    }

    create = async (req: Request, res: Response) => {
        res.json(await BASE_Companys_model.create(req.body))
    }

    update = async (req: Request, res: Response) => {
        res.json(await BASE_Companys_model.update(parseInt(req.params.IdCompany), req.body))
    }

    delete = async (req: Request, res: Response) => {
        res.json(await BASE_Companys_model.delete(parseInt(req.params.IdCompany)))
    }

}

export const Base_Companys_controller = new class_Base_Companys_controller()