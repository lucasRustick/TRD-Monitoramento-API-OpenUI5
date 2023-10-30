// Armazena as rotas de usuário
import express from "express"
import { AsyncHandler } from "root/Utils/asyncHandler"
import { Base_Users_controller } from "./users.controller"

export const users = express()

users.get("/Base/users/login=:login/password=:password", AsyncHandler(Base_Users_controller.validateLogin))

users.get("/Base/users/all/active/register", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Users_controller.getAllActiveToRegister))

users.get("/Base/users/getSelf", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Users_controller.getSelf))

users.post("/Base/users", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Users_controller.create))

users.put("/Base/users/IdUser=:IdUser", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Users_controller.update))

users.put("/Base/updatePassword/newPassword=:newPassword", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Users_controller.updatePassword))

users.delete("/Base/users/IdUser=:IdUser", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Users_controller.delete))