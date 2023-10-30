import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'

// Armazena o CRUD / Tipagem (caso não use prisma) da tabela User
export class class_Base_UserGroupTypes_model extends BaseModel {
    getAllActive(): Promise<Database.UserGroupTypes> {
        return this.connection.executeQuery<Database.UserGroupTypes>("SELECT * FROM UserGroupTypes WHERE Active = 1")
    }

    create(record: MaybeArray<Partial<Database.UserGroupTypes>>) {
        return this.connection.executeQuery("INSERT INTO UserGroupTypes (??) VALUES ?", this.formatInsert(record))
    }
}

export const Base_UserGroupTypes_model = new class_Base_UserGroupTypes_model()