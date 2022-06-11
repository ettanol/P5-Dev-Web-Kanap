const addListeners = () => {
    let itemQuantity = cartItems.getElementsByClassName('itemQuantity')
    let productPrices = document.querySelectorAll('.cart__item__content__description > p:last-child')
    let deleteItems = cartItems.getElementsByClassName('deleteItem')

    // loop through every iteration of the products
    for(i = 0; i< itemQuantity.length; i++) { 
        let item = itemQuantity[i]
        let product = products[i]
        let productPrice = productPrices[i]
        let deleteItem = deleteItems[i]
        let index = i
        const addToLocalStorage = () => {
        productsString = JSON.stringify(products)
        localStorage.setItem('products', productsString)
        }
        
        // update the cart
        item.addEventListener('change', async (e) => {
            // update quantity
            let value = e.currentTarget.value
            newQuantity = parseInt(value)
            let quantityToAdd = newQuantity - product.quantity
            product.quantity = parseInt(newQuantity)
            total = total + parseInt(quantityToAdd)
            totalQuantity.innerHTML = parseInt(total)

            // get the price of the specific product
            const getPrice = () => {
                fetch(`http://localhost:3000/api/products/${product.id}`)
                .then(res => {
                    if(res.ok) {
                        return res.json()
                    }
                })
                .then(product => {
                    // update price
                    priceOfProduct = newQuantity * product.price
                    productPrice.textContent = `${parseInt(priceOfProduct)} €`

                    price = price + parseInt(product.price * quantityToAdd)
                    totalPrice.innerHTML = parseInt(price)
            
                    // add the updated array to localStorage
                    addToLocalStorage()
                })
            }
            getPrice()
        })

        // delete an item from the cart
        deleteItem.addEventListener('click', async (e) => {
            // delete from localStorage and from the page
            if(confirm ("Souhaitez-vous supprimer cet article?")) {
                e.currentTarget.closest('.cart__item').remove()
                products.splice(index, 1)
                alert("Votre panier est bien mis à jour")
                
                // get the quantity to retrieve 
                quantityToAdd = -(e.currentTarget.closest('.cart__item').querySelector('.itemQuantity').value)
                // update the total quantity
                total = total + parseInt(quantityToAdd)
                totalQuantity.innerHTML = parseInt(total)
                const getPrice = () => {
                    fetch(`http://localhost:3000/api/products/${product.id}`)
                    .then(res => {
                        if(res.ok) {
                            return res.json()
                        }
                    })
                    .then(product => {
                        price = price + parseInt(product.price * quantityToAdd)
                        totalPrice.innerHTML = parseInt(price)
                        
                        // add the updated array to localStorage
                        addToLocalStorage()          
                    })
                }
                getPrice()
            }
        })
    }
}
addListeners()

// form validation
const form = document.getElementsByClassName('cart__order__form__question')
const order = document.getElementById('order')

let isValidArray = [false, false, false, false, false]
let contact = {firstName : "",lastName : "",address : "",city : "",email : ""}

productsString = localStorage.getItem('products')
let products = JSON.parse(productsString)

// verify if informations in the form are correct (using ReGex)
const matches = () => {
    for(i = 0; i< form.length; i++) {
        let formInput = form[i].children[1]
        let index = i
        formInput.addEventListener('change', (e) => {
            let name = e.currentTarget.name
            let id = e.currentTarget.id
            let value = e.currentTarget.value
            let expression = /^([\p{L}]{1,20}( |-|'|\.)? ?){1,4}/gu
            switch(name) {
                case ("Email") :
                expression = /^[-\p{L}0-9#!%$‘&+*–/=?^_`.{|}~]+@{1}[a-z]{1,15}\.{1}[a-z]{2,5}(\.[a-z]{2,5})?$/gu
                array = value.split(' ')
                break
                case("Adresse") : 
                expression = /^([0-9]{1,4})?( +|,)?( *)([\p{L}]{2,9}\.?)( |-|')(([\p{L}]{2,12})( |-|')?){1,5}/gu
                break
                case("Ville") : 
                expression = /^([0-9]{5})? ?([\p{L}\p{M}]+( |-|')?){1,4}/gu
                break
            }
            let testResult = expression.test(value)
            let match = value.match(expression)
            let isValid = false
            if(testResult && match[0] == value) {
                document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} valide`
                isValid = true
                contact[id] = value
            } else {
                document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} non valide`
                isValid = false
            }
            isValidArray.splice(index, 1, isValid)
        })
    }
}
matches()

// get product IDs
let productsID = []
const getProductsID = () => {
    if (localStorage.length != 0) {
        products.forEach(product => {
            fetch(`http://localhost:3000/api/products/${product.id}`)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then(product => {
                productsID.push(product._id)
                return productsID
            })
        })
    }
}
getProductsID()

const productID = {contact : contact, products : productsID}


order.addEventListener('click', (e) => {
    e.preventDefault()
    if (isValidArray.includes(false)) {
        alert ("Veuillez vérifier le formulaire")
    } else if (localStorage.length == 0) {
        alert("Veuillez ajouter au moins un produit")
    } else {
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(productID)
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }
        })
        .then ((body) => {
            window.location = `confirmation.html?orderID=${body.orderId}`
        })
        .then(() => {
            localStorage.clear()
            form.input.value = ""
        })
    }
})