// get elements from the dom
let cartItems = document.getElementById('cart__items')
let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')

// initializations
let cart = []
let itemsInThecart = 0
let total = 0
let price = 0
let i = 0

// wait for localStorage to load   
let productsString = localStorage.getItem('products')
products = JSON.parse(productsString)

async function populateCart() {
    if (localStorage.length !== 0) {
        cart = await Promise.all(
            products.map(async item => await displayCartProducts(item))
        )
        cart = cart.join('')
        cartItems.innerHTML = cart
        totalQuantity.innerHTML = total
        totalPrice.innerHTML = price

        addListeners();
    }
}
populateCart()

// waiting for products to be loaded then display them to the cart page
async function displayCartProducts(item) {
    return fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(res => {
        if(res.ok) {
            return res.json()
        }
    })
    .then( product => {
        let priceOfProduct = item.quantity * product.price
        total = total + parseInt(item.quantity)
        price = price + parseInt(priceOfProduct)
        let productToAdd =  `<article class="cart__item" data-id=${product._id} data-color="${item.color}">
        <div class="cart__item__img">
        <img src=${product.imageUrl}>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${item.color}</p>
        <p>${priceOfProduct} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`
        return productToAdd
    })
}


