import express from "express";
import ProdRouter from "./routers/product.routes.js";
import CartRouter from "./routers/carts.routes.js";



const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", ProdRouter)
app.use("/api/cart", CartRouter)



app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
 



