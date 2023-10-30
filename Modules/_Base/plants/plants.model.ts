import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'

// Armazena o CRUD / Tipagem (caso não use prisma) da tabela User
export class class_Base_Plants_model extends BaseModel {

    getAllActive() {
        return this.connection.executeQuery<Database.Plants[]>("SELECT * FROM plants WHERE Active = 1")
    }

    async getUnique(IdPlant: number) {
        let [first] = await this.connection.executeQuery<Database.Plants[]>("SELECT * FROM plants WHERE IdPlant = ?", [IdPlant])
        return first
    }

    create(record: MaybeArray<Partial<Database.Users>>) {
        return this.connection.executeQuery("INSERT INTO plants(??) VALUES ?", this.formatInsert(record))
    }

    update(IdPlant: number, record: Partial<Database.Users>) {
        return this.connection.executeQuery("UPDATE plants SET ? WHERE IdPlant = ?", [record, IdPlant])
    }

    delete(IdPlant: number) {
        return this.connection.executeQuery("UPDATE plants SET Active = false WHERE IdPlant = ?", [IdPlant])
    }
}

export const Base_Plants_model = new class_Base_Plants_model()