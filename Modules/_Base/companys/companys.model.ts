import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'

export class class_BASE_Companys_model extends BaseModel {
    getAllActive() {
        return this.connection.executeQuery<Database.Companys[]>("SELECT * FROM Companys WHERE Active = true")
    }

    async getUnique(IdCompany: number): Promise<Database.Companys> {
        let [first] = await this.connection.executeQuery<Database.Companys[]>("SELECT * FROM Companys WHERE IdCompany = ?", [IdCompany])
        return first
    }

    create(records: MaybeArray<Partial<Database.Companys>>) {
        return this.connection.executeQuery("INSERT INTO Companys (??) VALUES ?", this.formatInsert(records))
    }

    update(IdCompany: number, records: Partial<Database.Companys>) {
        return this.connection.executeQuery("UPDATE Companys SET ? WHERE IdCompany = ?", [records, IdCompany])
    }

    delete(IdCompany: number) {
        return this.connection.executeQuery("UPDATE Companys SET Active = false WHERE IdCompany = ?", [IdCompany])
    }
}

export const BASE_Companys_model = new class_BASE_Companys_model()