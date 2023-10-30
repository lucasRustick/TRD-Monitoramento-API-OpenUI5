import { BaseModel, MaybeArray } from "root/Utils/baseModel"
import { Database } from 'root/Utils/database'

export class class_Base_User_model extends BaseModel {

    async getByLoginAndPassword(login: string, password: string): Promise<Database.Users | null> {
        let [first] = await this.connection.executeQuery<Database.Users[]>("SELECT * FROM Users WHERE Login = ? AND Password = ?", [login, password])
        return first
    }

    getAllActive(): Promise<Database.Users[]> {
        return this.connection.executeQuery<Database.Users[]>("SELECT * FROM Users WHERE Active = 1")
    }

    async getAllActiveToRegister() {
        let actives = await this.getAllActive()

        let bindGroup = await this.bindUserGroups(actives)

        return bindGroup
    }

    async getSingleUserWithGroup(IdUser: number) {
        let [first] = await this.connection.executeQuery<Database.Users[]>("SELECT * FROM Users WHERE IdUser = ?", [IdUser])

        if (!first) {
            throw new Error("Usuário não encontrado!")
        }

        let [userWithGroup] = await this.bindUserGroups([first])

        return userWithGroup
    }

    async getByLogin(login: string): Promise<Database.Users | null> {
        let [first] = await this.connection.executeQuery<Database.Users[]>("SELECT * FROM Users WHERE Login = ?", [login])
        return first
    }

    bindUserGroups<T extends Database.Users>(records: T[]) {
        return this.bindTable<Database.UserGroups, T, "UserGroups">(records, "IdUserGroup", "UserGroups")
    }

    create(records: MaybeArray<Partial<Database.Users>>) {
        return this.connection.executeQuery("INSERT INTO Users(??) VALUES ?", this.formatInsert(records))
    }

    update(IdUser: number, record: Partial<Database.Users>) {
        return this.connection.executeQuery("UPDATE Users SET ? WHERE IdUser = ?", [record, IdUser])
    }

    delete(IdUser: number) {
        return this.connection.executeQuery("UPDATE Users SET active = false WHERE IdUser = ?", [IdUser])
    }
}

export const Base_User_model = new class_Base_User_model()