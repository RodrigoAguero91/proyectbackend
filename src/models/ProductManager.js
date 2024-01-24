import {promises as fs} from "fs"
import crypto from 'crypto'



export class ProductManager {
    constructor(path) {
        this.products =[]
        this.path = path

    }

 

    async getProducts() {
        const prods =JSON.parse(await fs.readFile(this.path, "utf-8"))
        return prods
    }

    async getProductById(id){
        const prods =JSON.parse(await fs.readFile(this.path, "utf-8"))
        const prod = prods.find(producto=> producto.id === id)
        return prod
    }

    async addProduct(prod) {
        const prods =JSON.parse(await fs.readFile(this.path, "utf-8"))
        const existProd = prods.find(producto =>producto.code === prod.code)
        if(existProd){
            return falses
        }

        prod.id =crypto.randomBytes(16).toString('hex')
        prods.push(prod)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return true
    }

    async updateProduct(id, producto) {
        const prods =JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = prods.find(producto => producto.id === id)
       if(prod) {
        prod.title = producto.title
        prod.description = producto.description
        prod.price = producto.price
        prod.imagen = producto.imagen
        prod.code = producto.code
        prod.stock = producto.stock
        prod.category = producto.category
        prods.push(prod)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return true
       }else{
            return false
       }
            
       
    }

    async deleteProduct(id) {
        const prods =JSON.parse(await fs.readFile(this.path, "utf-8"))
        const prod = prods.find(producto=> producto.id === id)

        if(prod) {
            await fs.writeFile(this.path, JSON.stringify(prods.filter(producto => producto.id !== id)))
            return true
        }else{
            return false
        }
    }



 
}
    

export default ProductManager