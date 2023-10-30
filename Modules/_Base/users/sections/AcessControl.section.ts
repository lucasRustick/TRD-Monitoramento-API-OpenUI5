import jwt from 'jsonwebtoken'
import { Utils } from 'root/Utils/utils'

Utils.configEnv()

// Armazena funções de usuarios como validação de Login validação de token
export class class_Base_AcessControl {

    generateToken(userId: number): string {
        if (!process.env.JWT_SECRET) {
            throw new Error("Aplicação sem JWT_SECRET")
        }

        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" })
    }

    verifyJwtToken(token: string): null | { id: number } {
        if (!process.env.JWT_SECRET) {
            throw new Error("Aplicação sem JWT_SECRET")
        }

        try {
            return jwt.verify(token, process.env.JWT_SECRET) as { id: number }
        } catch (error: any) {
            return null
        }
    }
}

export const Base_AcessControl = new class_Base_AcessControl()