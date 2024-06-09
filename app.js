// load data 
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(data=>{
    console.log(data);
    displayProducts(data);
})

const displayProducts = (products) =>{
    const productContainer = document.getElementById("product-container");

    products.forEach((product) =>{
        // create div 
        const div = document.createElement("div");
        div.classList = "product-card";
        div.innerHTML = `
            <img src=${product.image} alt=""/>
            <h5>${product.title.slice(0, 40)}</h5>
            <p>${product.description.slice(0, 70)}</p>
            <p><b>Price:</b> ${product.price} /-</p>
            <button>Details</button>
            <button>Add to Cart</button>
        `;
        productContainer.appendChild(div);
    });
}