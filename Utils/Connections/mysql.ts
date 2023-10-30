import mysql from 'mysql2'
import { Connection, ConnectionOptions } from 'mysql2/typings/mysql/lib/Connection'
import { Utils } from '../utils'

Utils.configEnv()

const defaultConnection: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
}

export class class_Base_Mysql_Conection {

    protected connection!: Connection
    protected connectionOptions!: ConnectionOptions

    constructor(connectionOptions: ConnectionOptions = defaultConnection) {

        this.connection = mysql.createConnection(connectionOptions)
        this.connectionOptions = connectionOptions
    }

    executeQuery<T = mysql.ResultSetHeader>(query: string, params?: any[], debug?: boolean): Promise<T> {
        return new Promise(async (resolve, reject) => {
            let queryObject = {
                sql: query,
                values: params
            }

            if (debug) console.log(JSON.stringify(queryObject))

            this.connection.query(queryObject, (error, result) => {

                if (error) {
                    return reject(error)
                }
                resolve(result as T)
            })
        })
    }

    static transaction<T = any>(fn: (conection: class_Base_Mysql_Conection) => Promise<T>, connectionOptions: ConnectionOptions = defaultConnection) {
        return new Promise((resolve, reject) => {
            let conection = new class_Base_Mysql_Conection(connectionOptions)

            conection.connection.beginTransaction((error) => {
                if (error) return reject(error)

                fn(conection)
                    .catch((error) => {
                        reject(error)

                        conection.connection.rollback((error) => {
                            if (error) {
                                console.log("Erro ao fazer rollback")
                                console.log(error)
                            }
                        })
                    })
                    .then((result) => {
                        conection.connection.commit((error) => {
                            if (error) return reject(error)

                            resolve(result)
                        })
                    })
            })
        })
    }
}

export const Base_Mysql_Conection = new class_Base_Mysql_Conection()