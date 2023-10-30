import { Utils } from "root/Utils/utils"
import { Server, Socket as SocketType } from "socket.io"

Utils.configEnv()

type SocketHandler = (param: any, socket: SocketType, io: Server) => void

export class class_Socket {

    public readonly io: Server

    private SocketRoutes: Record<string, Array<SocketHandler>> = {
        "leaveAllRooms": [
            leaveAllRooms,
        ],
        "joinRoom": [
            joinRoom
        ]
    }

    constructor() {
        let port = process.env.SOCKETPORT || "4001"
        this.io = new Server({
            cors: {
                origin: "*"
            }
        }).listen(parseInt(port))

        this.defaultSocketRoutes()
    }

    private defaultSocketRoutes() {
        this.io.on("connection", (socket) => {

            Object.keys(this.SocketRoutes).forEach((key) => {

                this.SocketRoutes[key].forEach((fn) => {

                    socket.on(key, (param) => {
                        fn(param, socket, this.io)
                    })
                })
            })
        })
    }

    public on(route: string, fn: SocketHandler) {
        this.io.sockets.sockets.forEach((item) => {

            item.on(route, (param) => {
                fn(param, item, this.io)
            })
        })

        if (!this.SocketRoutes[route]) {
            this.SocketRoutes[route] = []
        }

        this.SocketRoutes[route].push(fn)

        return this.SocketRoutes[route].indexOf(fn)
    }
}

function leaveAllRooms(_: any, socket: SocketType) {
    socket.rooms.forEach((room) => {
        if (room === socket.id) return
        socket.leave(room)
    })
}

function joinRoom(room: string, socket: SocketType) {
    socket.join(room)
}

export const Socket = new class_Socket()