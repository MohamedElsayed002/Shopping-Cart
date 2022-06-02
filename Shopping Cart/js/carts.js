// let productsInCart = localStorage.getItem("productsInCart")
let productsDom = document.querySelector(".products")
let noProducts = document.querySelector(".noProducts")
    // if (productsInCart) {
    //     let items = JSON.parse(productsInCart)
    //     drawCartProductsUI(items);
    // }

function drawCartProductsUI(allProducts = []) {
    if (JSON.parse(localStorage.getItem("productsInCart")).length === 0)
        noProducts.innerHTML = "There is no items"
    let products = JSON.parse(localStorage.getItem("productsInCart")) || allProducts;
    let productsUI = products.map((item) => {
        return `            
        <div class="product-item">
        <img
        src="${item.imageUrl}"
        class="product-item-img"
        alt="image"/>
        <div class="product-item-desc">
            <h2>${item.title}</h2>
            <p>Smart Man Living in Egypt xD</p>
            <span>Size : ${item.size}</span><br>
            <span>Quantity : ${item.qty} </span>
        </div>
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="removeFromCart(${item.id})">Remove from Cart</button>
        </div>
    </div>`;
    })
    productsDom.innerHTML = productsUI;
}
drawCartProductsUI()

function removeFromCart(id) {
    let productsInCart = localStorage.getItem("productsInCart")
    if (productsInCart) {
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart", JSON.stringify(filteredItems))
        drawCartProductsUI(filteredItems)
    }
}