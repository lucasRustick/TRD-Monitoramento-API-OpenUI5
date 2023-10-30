import { Log } from './Utils/log'
import { Utils } from './Utils/utils'
import { server } from './Config/server'
import { Socket } from './Config/socket'

Utils.configEnv()

const port = process.env.PORT || 4000
const socketPort = process.env.SOCKETPORT || 4001

server.app.listen(port, async () => {
    Log.insertLog({ msg: "Api iniciada" })

    console.log(new Date().toLocaleString('pt-br'))
    console.log(`Aplicação rodando em: http://localhost:${port}`)
    console.log(`Socket rodando em: http://localhost:${socketPort}`)

    await Utils.sleep(3000)

    Socket.io.emit("reload")
})