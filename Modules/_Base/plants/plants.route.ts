// Armazena as rotas de usuário
import express from "express"
import { Base_Plants_controller } from "./plants.controller"
import { AsyncHandler } from "root/Utils/asyncHandler"
import { Base_Users_controller } from "../users/users.controller"

export const plants = express()

plants.get("/Base/plants/all/active", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Plants_controller.getAllActive))

plants.post("/Base/plants", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Plants_controller.create))

plants.put("/Base/plants/IdPlant=:IdPlant", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Plants_controller.update))

plants.delete("/Base/plants/IdPlant=:IdPlant", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Plants_controller.delete))