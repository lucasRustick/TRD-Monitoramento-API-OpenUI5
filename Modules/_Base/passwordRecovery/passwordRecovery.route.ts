// Armazena as rotas de usuário
import express from "express"
import { AsyncHandler } from "root/Utils/asyncHandler"
import { Base_Password_Recovery_controller } from "./passwordRecovery.controller"
import { Base_Users_controller } from "../users/users.controller"

export const password_recovery = express()

password_recovery.get("/Base/password_recovery", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Password_Recovery_controller.getAllActiveAndPending))

password_recovery.post(`/Base/password_recovery/login=:login`, AsyncHandler(Base_Password_Recovery_controller.create))

password_recovery.put("/Base/password_recovery/IdPasswordRecovery=:IdPasswordRecovery/status=:status", Base_Users_controller.acessMiddleware, AsyncHandler(Base_Password_Recovery_controller.update))