import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'
import { Request, Response } from "express"

export class class_BASE_Agents_model extends BaseModel {
    getAllActive() {
        return this.connection.executeQuery<Database.Agents[]>("SELECT * FROM Agents WHERE Active = true")
    }

    monitoring(){
        return this.connection.executeQuery<Database.Agents>(`
            SELECT
                *
            FROM
                banco_teste.agents
                JOIN banco_teste.tasks 
            ON 
                agents.IdAgents = tasks.IdAgent
            WHERE
                tasks.active = true
                AND agents.active = true
                AND tasks.status != 5
        `,)
    }

    async getUnique(IdAgents: number): Promise<Database.Agents> {
        let [first] = await this.connection.executeQuery<Database.Agents[]>("SELECT * FROM Agents WHERE IdAgents = ?", [IdAgents])
        return first
    }

    create(records: MaybeArray<Partial<Database.Agents>>) {
        return this.connection.executeQuery("INSERT INTO Agents (??) VALUES ?", this.formatInsert(records))
    }

    update(IdAgents: number, records: Partial<Database.Agents>) {
        return this.connection.executeQuery("UPDATE Agents SET ? WHERE IdAgents = ?", [records, IdAgents])
    }

    delete(IdAgents: number) {
        return this.connection.executeQuery("UPDATE Agents SET Active = false WHERE IdAgents = ?", [IdAgents])
    }
}

export const BASE_Agents_model = new class_BASE_Agents_model()