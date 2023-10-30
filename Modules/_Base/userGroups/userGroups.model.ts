import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'

// Armazena o CRUD / Tipagem (caso não use prisma) da tabela User
export class class_Base_UserGroups_model extends BaseModel {

    getAllActive() {
        return this.connection.executeQuery<Database.UserGroups[]>("SELECT * FROM UserGroups WHERE Active = true")
    }

    async getAllActiveToRegister() {
        let records = await this.getAllActive()
        return await this.bindGroupType(records)
    }

    async getUnique(id: number): Promise<Database.UserGroups> {
        let [first] = await this.connection.executeQuery<Database.UserGroups[]>("SELECT * FROM UserGroups WHERE id = ?", [id])
        return first
    }

    bindGroupType<T extends Database.UserGroups>(reecords: T[]) {
        return this.bindTable<Database.UserGroupTypes, T, "UserGroupTypes">(reecords, "IdUserGroupType", "UserGroupTypes")
    }

    create(records: MaybeArray<Partial<Database.UserGroups>>) {
        return this.connection.executeQuery("INSERT INTO UserGroups (??) VALUES ?", this.formatInsert(records))
    }

    update(IdUserGroup: number, record: Partial<Database.UserGroups>) {
        return this.connection.executeQuery("UPDATE UserGroups SET ? WHERE IdUserGroup = ?", [record, IdUserGroup])
    }

    delete(IdUserGroup: number) {
        return this.connection.executeQuery("UPDATE UserGroups SET Active = false WHERE IdUserGroup = ?", [IdUserGroup])
    }
}

export const Base_UserGroups_model = new class_Base_UserGroups_model()