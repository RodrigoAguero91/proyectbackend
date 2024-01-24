import express from "express";
import routerProd from "./routes/products.routes.js";
import CartRouter from "./routes/carts.routes.js";




const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/products", routerProd)
app.use("/api/carts", CartRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})
 



