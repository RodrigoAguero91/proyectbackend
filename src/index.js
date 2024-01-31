import express from "express";
import ProdRouter from "./routers/product.routes.js";
import CartRouter from "./routers/carts.routes.js";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import {Server} from "socket.io"
import socketProducts from "./public/js/socketProducts.js";


const app = express();
const PORT = 8080;
 
const product = new ProductManager();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", ProdRouter)
app.use("/api/cart", CartRouter)



//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static
app.use("/", express.static(__dirname + "/public"))

//home.handlebars
app.get("/", async (req,res)=>{
    let allProducts = await product.getProducts()
    res.render("home", {
        title:"Home",
        products : allProducts
    })
})

//realtimeproducts.handlebars
app.get("/:id", async (req,res)=>{
    let realtimeproducts = await product.getProductsById(req.params.id)
    res.render("realtimeproducts", {
        title:"Realproducts",
        products : realtimeproducts
    })
})

const httpServer=app.listen(PORT, () => {
    
        console.log(`Usuario conectado por  puerto ${PORT}`);
    
});

const socketServer = new Server(httpServer)

socketProducts(socketServer)

