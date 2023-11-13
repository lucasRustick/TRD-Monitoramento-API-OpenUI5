import { Request, Response } from "express"
import { BASE_Agents_model } from "./agents.model"

export class class_Base_Agents_controller {

    getAllActive = async (req: Request, res: Response) => {
        res.json(await BASE_Agents_model.getAllActive())
    }

    monitoring = async (req: Request, res: Response) => {
        let { agent, task } = req.body as ReportsPayload
        
        let formData = await BASE_Agents_model.monitoring()

        if(task){
            formData = formData.filter((item:any) => item.Name === task)
        }

        if(agent) {
            formData = formData.filter((item:any) => item.AgentName === agent)
        }

        res.json(formData)
    }

    create = async (req: Request, res: Response) => {
        res.json(await BASE_Agents_model.create(req.body))
    }

    update = async (req: Request, res: Response) => {
        res.json(await BASE_Agents_model.update(parseInt(req.params.IdAgents), req.body))
    }

    delete = async (req: Request, res: Response) => {
        res.json(await BASE_Agents_model.delete(parseInt(req.params.IdAgents)))
    }

}

export const Base_Agents_controller = new class_Base_Agents_controller()

interface ReportsPayload {
    agent?: string
    task?: string
}