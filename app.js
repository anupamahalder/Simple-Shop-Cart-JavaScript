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
            <p>${product.description.slice(0, 50)}</p>
            <p><b>Price:</b> ${product.price} /-</p>
            <button>Details</button>
            <button onclick="handleAddToCart('${product.title?.slice(0,20)}', ${product.price})">Add to Cart</button>
        `;
        productContainer.appendChild(div);
    });
}

const handleAddToCart = (name, price) =>{
    const cartCount = document.getElementById("count-item").innerText;
    let convertedCount = parseInt(cartCount);
    convertedCount += 1;
    document.getElementById("count-item").innerText = convertedCount;
    const container = document.getElementById("cart-main-container");
    // create a div 
    const div = document.createElement("div");
    div.classList = "card-info";
    div.innerHTML = `
    <p>${name}, </p>
    <p><b>Price: Rs. <span class="price">${price}</span></b></p>
    `
    container.appendChild(div);
    console.log(name, price);
    updateTotal();
}

const updateTotal = ()=>{
    const allPrice = document.getElementsByClassName("price");
    let total = 0;
    for(const element of allPrice){
        total += parseFloat(element.innerText);
    }
    document.getElementById("total-price").innerText = " Rs. " + total.toFixed(2);
}