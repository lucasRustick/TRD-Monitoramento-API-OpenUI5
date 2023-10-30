// Armazena as rotas de usuário
import express from "express"
import { AsyncHandler } from "root/Utils/asyncHandler"
import { Base_Companys_controller } from "./companys.controller"
import { Base_Users_controller } from "../users/users.controller"

export const companys = express()

companys.get("/Base/companys/all/active", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Companys_controller.getAllActive))

companys.post("/Base/companys", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Companys_controller.create))

companys.put("/Base/companys/IdCompany=:IdCompany", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Companys_controller.update))

companys.delete("/Base/companys/IdCompany=:IdCompany", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Companys_controller.delete))