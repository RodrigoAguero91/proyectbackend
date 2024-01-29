const socketclient = io()

socketclient.on("enviodeproductos",(obj)=>{
    updateProductlist(obj)
})

function updateProductlist(prodList){
    const productsDiv =document.getElementById('listproducts')
    let producthtml ="";

    prodList.forEach((product) => {
        producthtml += `
        <div class="col mb-4">
                <div class="card h-100 bg-light">
                    <div class="card-heard bg-primary text-white">
                        ID:${product.id}
                    </div>
                        <div class="card-body ">
                                                
                            <ul class="list-unstyled">
                                <li>Titulo:${product.title}</li>
                                <li>description:${product.description}</li>
                                <li>Precio:$ ${product.price}</li>
                                <li><Stock:${product.stock}</li>
                                <li>Status:${product.status}</li>
                                <li>Categoria:${product.category}</li>
                                <li>Codigo:${product.code}</li>
                                <li><img>${product.imagen}</img></i></li>
                                    
                            </ul>
                        </div>
                </div>
        </div> `;
        
    });

    productsDiv.innerHTML = producthtml;
}