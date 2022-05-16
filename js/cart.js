// get the products from localStorage
let productsAddedString = localStorage.getItem('productsAdded')
const productsAdded = JSON.parse(productsAddedString)
let cartItems = document.getElementById('cart__items')
let cart = []
let itemsInThecart = 0

// separae all items using foreach?
function joinAllProducts() {
    for(i=0; i< productsAdded.length; i++){
        let Product = productsAdded[i]
        fetch(`http://localhost:3000/api/products/${Product.id}`)
        .then(res => {
            if(res.ok) {
                return res.json()
            }
        })
        .then( product => {
            return `<article class="cart__item" data-id=${product._id} data-color="${Product.color}">
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
        })
        .then(product => {
            // add all items in an array
            itemsInThecart = cart.push(product)
            console.log(cart)
        })
    }
}

function join() {
    return cart = cart.join('') 
}

joinAllProducts()
join()
    
// cartItems.innerHTML = cart



// map the items in a new array
// join all items
// insert in the DOM