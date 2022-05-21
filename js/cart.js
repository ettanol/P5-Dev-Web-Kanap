window.addEventListener('DOMContentLoaded',
    () => {
        let i=0
        // wait for localStorage to load
        let checkLocalStorage = new Promise((resolve, reject) => {   
            let productsString = localStorage.getItem('products')
            products = JSON.parse(productsString)
            if(products.length !== null) {
                resolve(products)
            } else {
                reject('failed')
           }
        })
          
        checkLocalStorage.then((products) => { 
              while(i < products.length) {
              addProductToCart(i)
              i++
              }
          } ,
          (error) => { console.log(error) }
        ) .catch ((error) => {
            throw error
        })            
    }
)

// get elements from the dom
let cartItems = document.getElementById('cart__items')
let totalQuantity = document.getElementById('totalQuantity')
let totalPrice = document.getElementById('totalPrice')

// initializations
let cart = []
let itemsInThecart = 0
let total = 0
let price = 0

// waiting for products to be loaded then display them to the cart page
async function addProductToCart(i) {
    let item = await products[i]
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
            if(i === products.length -1) {
                cart = cart.join('')
                cartItems.innerHTML = cart
                totalQuantity.innerHTML = total
                totalPrice.innerHTML = price
            }
    })
}


