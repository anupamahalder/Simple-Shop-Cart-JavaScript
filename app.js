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
            <img class="img-style" src=${product.image} alt=""/>
            <h5>${product.title.slice(0, 40)}</h5>
            <p>${product.description.slice(0, 50)}</p>
            <p><b>Price:</b> ${product.price} /-</p>
            <button onclick="handleDetailsProduct('${product.id}')">Details</button>
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

const handleDetailsProduct = (id)=>{
    console.log(id);
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product =>{
        // Create modal HTML dynamically
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.setAttribute('id', 'productModal');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'productModalLabel');
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-image">
                        <img class="img-style2" src=${product.image} alt=""/></div>
                        <h5 class="modal-title" id="productModalLabel">${product.title}</h5>
                        <p>Category: ${product.category}</p>
                        <p>Description: ${product.description}</p>
                        <p>Price: Rs. ${product.price} /-</p>
                        <!-- Add more details as needed -->
                    </div>
                </div>
            </div>
        `;

        // Append modal to the body
        document.body.appendChild(modal);

        // Show the modal
        const productModal = new bootstrap.Modal(modal);
        productModal.show();
    })
    .catch(error => console.error('Error fetching product details:', error));  
}