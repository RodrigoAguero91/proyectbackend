import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"

import routerP from "./routes/products.router.js";
import routerV from "./routes/views.router.js";
import socketProducts from "./sockets/socketProducts.js";

import connectToDB from "./Dao/indexMongodb.js"
import socketChat from "./sockets/socketChat.js";
import routerC from "./routes/carts.router.js";
const app = express()
const PORT=8080

app.use(express.json());
app.use(express.static(__dirname + "/public"))

app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

app.use("/api",routerP)
app.use('/', routerV);
app.use("/api",routerC)
connectToDB()
const httpServer=app.listen(PORT, () => {
    try {
        console.log(`Usuario conectado al puerto ${PORT}`);
       
    }
    catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer)

socketProducts(socketServer)
socketChat(socketServer)