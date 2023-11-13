export namespace Database {

    export interface Companys {
        IdCompany: number
        Name: string
        Active: 1 | 0
    }

    export interface Plants {
        IdPlant: number
        Name: string
        Active: 1 | 0
    }

    export interface UserGroupTypes {
        IdUserGroupType: number
        Name: string
        Active: 1 | 0
    }

    export interface UserGroups {
        IdUserGroup: number
        IdUserGroupType: number
        Name: string
        Active: 1 | 0
    }

    export interface Users {
        IdUser: number
        IdUserGroup: number
        Name: string
        Login: string
        Password: string
        Last_Login: string
        Locked: 1 | 0
        Active: 1 | 0
    }

    export interface PasswordRecoverys {
        IdPasswordRecovery: number
        IdUser: number
        Date: string
        Approved: 1 | 0
        Active: 1 | 0
    }

    export interface Agents {
        filter: any
        IdAgents: number
        AgentName: string
        Active: 1 | 0
    }
}