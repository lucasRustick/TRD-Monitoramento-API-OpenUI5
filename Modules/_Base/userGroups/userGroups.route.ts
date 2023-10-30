// Armazena as rotas de usuário
import express from "express"
import { AsyncHandler } from "root/Utils/asyncHandler"
import { Base_User_Groups_controller } from "./userGroups.controller"
import { Base_Users_controller } from "../users/users.controller"

export const user_groups = express()

user_groups.get("/Base/user_groups/all/active/register", Base_Users_controller.acessMiddleware, AsyncHandler(Base_User_Groups_controller.getAllActiveToRegister))

user_groups.get("/Base/user_groups/user_group_types", Base_Users_controller.acessMiddleware, AsyncHandler(Base_User_Groups_controller.getGroupTypes))

user_groups.post("/Base/user_groups", Base_Users_controller.acessMiddleware, AsyncHandler(Base_User_Groups_controller.create))

user_groups.put("/Base/user_groups/IdUserGroup=:IdUserGroup", Base_Users_controller.acessMiddleware, AsyncHandler(Base_User_Groups_controller.update))

user_groups.delete("/Base/user_groups/IdUserGroup=:IdUserGroup", Base_Users_controller.acessMiddleware, AsyncHandler(Base_User_Groups_controller.delete))