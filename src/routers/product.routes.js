import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProdRouter = Router()
const product = new ProductManager();



ProdRouter.get("/", async(req,res) =>{
    res.send(await product.getProducts())
})

ProdRouter.get("/:id", async(req,res) =>{
    let id = req.params.id
    res.send(await product.getProductsById(id))
})


ProdRouter.post("/", async(req,res) =>{
    let  newProduct =req.body
    res.send(await product.addProducts(newProduct))
})

ProdRouter.put("/:id", async(req,res) =>{
    let id = req.params.id
    let updateProducts = req.body
    res.send (await product.updateProduct(id, updateProducts))
})

ProdRouter.delete("/:id", async(req,res) =>{
    let id = req.params.id
    res.send (await product.deleteProduct(id))
})

export default ProdRouter