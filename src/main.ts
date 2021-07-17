import { Server } from "colyseus"
import http from "http"
import express from "express"
import { monitor } from "@colyseus/monitor"
import basicAuth from "express-basic-auth"

const port = Number(process.env.PORT) || 3000

import TicTacToe from "./rooms/TicTacToe"

const app = express()
app.use(express.json())

const gameServer = new Server({
    server: http.createServer(app)
})

gameServer.define("tic-tac-toe", TicTacToe)

// Monitor
const basicAuthMiddleware = basicAuth({
    users: {
        "kstudio@founder": "@3t.2021",
    },
    challenge: true
});

app.use("/colyseus", basicAuthMiddleware, monitor())

gameServer.listen(port)


app.get('/status', (req, res) => {
    res.send('Krystal Studio (c) Ultimate Tic Tac Toe GameServer v0.0.15 is running up !!!')
  })
  
console.log(`GameServer at ws://localhost:${port}`)
console.log(`Monitor at http://localhost:${port}/colyseus`)