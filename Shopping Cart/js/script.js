let userInfo = document.querySelector("#user_info")
let userDom = document.querySelector("#user")
let links = document.querySelector("#links")
let logoutBtn = document.querySelector("#logout")

if (localStorage.getItem("username")) {
    links.remove()
    userInfo.style.display = "flex"
    userDom.innerHTML = localStorage.getItem("username")
}

logoutBtn.addEventListener('click', function() {
    localStorage.clear();
    setTimeout(() => {
        window.location = "register.html"
    }, 1500);
})

// Define Product
let productsDom = document.querySelector(".products")
let cartProductDom = document.querySelector(".carts-products")
let badgeDom = document.querySelector(".badge")
let shoppingCartIcon = document.querySelector(".shoppingCart")
let productss = JSON.parse(localStorage.getItem("products"))
let products = [{
        id: 1,
        title: "Mohamed Elsayed",
        size: "large",
        imageUrl: "imgs/M1.jpg",
        qty: 1
    },
    {
        id: 2,
        title: "Laptop",
        size: "small",
        imageUrl: "imgs/M1.jpg",
        qty: 1
    },
    {
        id: 3,
        title: "Tarek Karem",
        size: "large",
        imageUrl: "imgs/M1.jpg",
        qty: 1
    },
    {
        id: 4,
        title: "Palstin",
        size: "large",
        imageUrl: "imgs/M1.jpg",
        qty: 1
    }
]
localStorage.setItem("products", JSON.stringify(products));
let drawProductsUI;
(drawProductsUI = function(products = []) {
    let productsUI = products.map((item) => {
        console.log("eee", item)
        return `            
        <div class="product-item">
        <img
        src="${item.imageUrl}"
        class="product-item-img"
        alt="image"/>
        <div class="product-item-desc">
            <a onclick='saveItemData(${item.id})'>${item.title}</a>
            <p>Smart Man Living in Egypt xD</p>
            <span>Size : ${item.size}</span>
        </div>
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="addedToCart(${item.id})">Add to Cart</button>
            <i class="favorite far fa-heart" style="color: ${item.liked == true ? "red" : ""}"onclick="addToFavorite(${item.id})"></i>
        </div>
    </div>`;
    })
    productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")))
drawProductsUI()

// function checkLogedUser() {
//     if (localStorage.getItem("username")) {
//         window.location = "cartproducts.html"
//     } else {
//         window.location = "login.html"
//     }
// }
let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : []

if (addedItem) {
    addedItem.map((item) => {
        cartProductDom.innerHTML += `<p> ${item.title} </p>`
    })
    badgeDom.style.display = "block";
    badgeDom.innerHTML += addedItem.length;
}

let allItems = []

function addedToCart(id) {
    if (localStorage.getItem("username")) {
        // window.location = "cartproducts.html"
        let choosenItem = products.find((item) => item.id === id);
        let item = allItems.find(i => i.id === choosenItem.id)
        if (item) {
            choosenItem.qty += 1;
        } else {
            allItems.push(choosenItem)
        }
        cartProductDom.innerHTML = ""
        allItems.forEach((item) => {
                cartProductDom.innerHTML += `<p>${choosenItem.title}</p>`

            })
            // cartProductDom.innerHTML += `<p>${choosenItem.title}</p>`
        addedItem = [...addedItem, choosenItem]
        let uniqueProducts = getUniqueArr(addedItem, "id")
        localStorage.setItem("productsInCart", JSON.stringify(uniqueProducts))
            // Local storage
        let cartProductLength = document.querySelectorAll('.carts-products  p')
        badgeDom.style.display = "block";
        badgeDom.innerHTML = cartProductLength.length;
    } else {
        window.location = "login.html"
    }
}
// to not repeat item 
function getUniqueArr(arr, filterType) {
    let unique = arr.map(item => item[filterType]).map((item, i, final) => final.indexOf(item) === i && i).filter((item) => arr[item]).map((item) => arr[item]);

    return unique
}

shoppingCartIcon.addEventListener("click", openCartMenu)

function openCartMenu() {
    if (shoppingCartIcon.innerHTML != "") {
        if (cartProductDom.style.display = "none") {
            cartProductDom.style.display = "block";
        } else {
            cartProductDom.style.display = "none"
        }
    }
}

function saveItemData(id) {
    localStorage.setItem("productId", id);
    window.location = "cartsDetails.html"
}

// Search Item 
let input = document.getElementById("search")
input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        search(e.target.value, JSON.parse(localStorage.getItem("products")))
    }
    if (e.target.value.trim() === "")
        drawProductsUI(JSON.parse(localStorage.getItem("products")))
        // drawProductsUI(JSON.parse(localStorage.getItem))
})

function search(title, myArray) {
    // let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
    let arr = myArray.filter((item) => item.title.indexOf(title) !== -1);
    drawProductsUI(arr)
}



// Add to favorite 
let favoritesItems = localStorage.getItem("productsFavorite") ?
    JSON.parse(localStorage.getItem("productsFavorite")) : [];

function addToFavorite(id) {
    if (localStorage.getItem("username")) {
        // window.location = "cartproducts.html"
        let choosenItem = products.find((item) => item.id === id);
        favoritesItems = [...favoritesItems, choosenItem]
        choosenItem.liked = true
        let uniqueProducts = getUniqueArr(favoritesItems, "id")
        localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts))
        products.map((item) => {
            if (item.id === choosenItem.id) {
                item.liked = true
            }
        });
        localStorage.setItem("products", JSON.stringify(products))
        drawProductsUI(products)
    } else {
        window.location = "login.html"
    }
}