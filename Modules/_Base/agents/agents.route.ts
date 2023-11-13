// Armazena as rotas de usuário
import express from "express"
import { AsyncHandler } from "root/Utils/asyncHandler"
import { Base_Agents_controller } from "./agents.controller"
import { Base_Users_controller } from "../users/users.controller"

export const Agents = express()

Agents.get("/Base/Agents/all/active", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Agents_controller.getAllActive))

Agents.post("/Base/Agents/monitoring", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Agents_controller.monitoring))

Agents.post("/Base/Agents", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Agents_controller.create))

Agents.put("/Base/Agents/IdAgents=:IdAgents", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Agents_controller.update))

Agents.delete("/Base/Agents/IdAgents=:IdAgents", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Agents_controller.delete))