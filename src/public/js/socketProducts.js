import ProductManager from "../../controllers/ProductManager.js";
import __dirname from "../../utils.js";
const pm = new ProductManager(__dirname+'../../controllers/ProductManager.js')

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("Usuario conectado:",socket.id)
        const listadeproductos=await pm.getProducts()

        socketServer.emit("enviodeproducts",listadeproductos)

        socket.on("addProduct",async(obj)=>{
            await pm.addProducts(obj)
            const listadeproductos=await pm.getProducts()
            socketServer.emit("enviodeproducts",listadeproductos)
            })

            socket.on("deleteProduct",async(id)=>{
                await pm.deleteProduct(id)
                const listadeproductos=await pm.getProducts()
                socketServer.emit("enviodeproducts",listadeproductos)
                })
        
    })
};

export default socketProducts;