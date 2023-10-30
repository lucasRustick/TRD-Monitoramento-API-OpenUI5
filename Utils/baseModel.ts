import { Base_Mysql_Conection } from "./Connections/mysql"

export abstract class BaseModel {

    protected readonly connection = Base_Mysql_Conection

    protected async bindTable<Res extends Record<string, any>, R extends Record<string, any>, T extends string>(records: R[], propBindName: keyof R, bindTable: T): BindTableReturn<Res[], R, T> {
        let idsTable = records.map((item) => item[propBindName])

        if (idsTable.length === 0) {
            return []
        }

        let binds = await this.connection.executeQuery<Res[]>("SELECT * FROM ?? WHERE ?? in (?) AND active = true", [bindTable, propBindName, idsTable])

        return records.map((item) => {
            let grupo = binds.filter((subItem) => subItem[(propBindName as any)] === item[propBindName])

            return Object.assign(item, { [bindTable]: grupo })
        })
    }

    protected formatInsert(insert: MaybeArray<Record<string, any>>): [string[], any[]] {
        if (!Array.isArray(insert)) {
            return [
                Object.keys(insert),
                [Object.values(insert)]
            ]
        }

        this.validateColumns(insert)

        return [
            Object.keys(insert[0]),
            insert.map((item) => Object.values(item))
        ]
    }

    private validateColumns(insert: Record<string, any>[]) {
        let firstColumns = JSON.stringify(Object.keys(insert[0]))

        let validar = insert.find((item) => {
            return JSON.stringify(Object.keys(item)) !== firstColumns
        })

        if (validar) throw new Error(`As chaves dos objetos do array não são iguais. Encontrou ${validar} enquanto esperava ${firstColumns}`)
    }
}

export type BindTableReturn<Res extends Record<string, any>, R extends Record<string, any>, T extends string> = Promise<Array<R & { [K in T]: Res }>>

export type MaybeArray<T = any> = T | T[]
