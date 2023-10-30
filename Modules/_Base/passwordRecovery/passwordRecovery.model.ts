import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'

// Armazena o CRUD  da tabela User
export class class_Base_PasswordRecovery_model extends BaseModel {

    async getAllActiveAndPending() {
        let records = await this.connection.executeQuery<Database.PasswordRecoverys[]>("SELECT * FROM PasswordRecoverys WHERE Active = true AND Approved is null")
        return this.bindUsers(records)
    }

    async getUnique(IdPasswordRecovery: number) {
        let [record] = await this.connection.executeQuery<Database.PasswordRecoverys[]>("SELECT * FROM PasswordRecoverys WHERE IdPasswordRecovery = ?", [IdPasswordRecovery])
        return record
    }

    bindUsers<T extends Database.PasswordRecoverys>(records: T[]) {
        return this.bindTable<Database.Users, T, "Users">(records, "IdUser", "Users")
    }

    create(register: MaybeArray<Partial<Database.PasswordRecoverys>>) {
        return this.connection.executeQuery("INSERT INTO PasswordRecoverys(??) VALUES ?", this.formatInsert(register))
    }

    updateStatus(IdPasswordRecovery: number, status: boolean) {
        return this.connection.executeQuery("UPDATE PasswordRecoverys SET Approved = ? WHERE IdPasswordRecovery = ?", [status, IdPasswordRecovery])
    }
}

export const Base_PasswordRecovery_model = new class_Base_PasswordRecovery_model()