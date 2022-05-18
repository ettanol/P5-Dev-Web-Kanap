// get the products from localStorage
let productsAddedString = localStorage.getItem('productsAdded')
const productsAdded = JSON.parse(productsAddedString)

// get elements from the dom
let cartItems = document.getElementById('cart__items')
let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')

// initializations
let cart = []
let itemsInThecart = 0
let total = 0
let price = 0

// separate all items using foreach?
function addProductToCart(i) {
    let item = productsAdded[i]
    fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(res => {
        if(res.ok) {
            return res.json()
        }
    })
    .then( product => {
        let priceOfProduct = (item.quantity) * product.price
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
            itemsInThecart = cart.push(productToAdd)
            if(i === productsAdded.length -1) {
                cart = cart.join('')
                cartItems.innerHTML = cart
                totalQuantity.innerHTML = total
                totalPrice.innerHTML = price
            }
    })
}

const join = () => {
    let i=0
    while(i < productsAdded.length) {
        addProductToCart(i)
        i++
    }
}

join()
