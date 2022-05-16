// get the products from localStorage
let productsAddedString = localStorage.getItem('productsAdded')
const productsAdded = JSON.parse(productsAddedString)
let cartItems = document.getElementById('cart__items')
let cart = []
let itemsInThecart = 0

// separate all items using foreach?
function addProductToCart(i) {
    let Product = productsAdded[i]
    fetch(`http://localhost:3000/api/products/${Product.id}`)
    .then(res => {
        if(res.ok) {
            return res.json()
        }
    })
    .then( product => {
        let productToAdd =  `<article class="cart__item" data-id=${product._id} data-color="${Product.color}">
                <div class="cart__item__img">
                <img src=${product.imageUrl}>
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${Product.color}</p>
                    <p>${product.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${Product.color}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article>`
            itemsInThecart = cart.push(productToAdd)
            // console.log(cart)
    })
}

const join = async () => {
    let i=0
    while(i < productsAdded.length) {
        await addProductToCart(i)
        i++
    }
    cart = cart.join('') 
    console.log(cart)
}

join()
    
// cartItems.innerHTML = cart

// add or remove a product directly from the cart

let itemQuantity = document.querySelector('.itemQuantity')
let deleteItem = document.querySelector('.deleteItem')

// itemQuantity.addEventListener('input', (e) => {
//     productsAdded(e.target.value)
// })