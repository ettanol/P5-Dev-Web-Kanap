const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const color = document.getElementById('colors')

// get the ID from the URL
const params = new
URLSearchParams(document.location.search)
const id = params.get("_id")

// get all infos from the API
function getProductInfo() {
    fetch(`http://localhost:3000/api/products/${id}`) // get the specific product from the API
        .then(res => {
            if(res.ok) {
            return res.json() // transform the result to an object
            }
        })
        .then(product => {
            // display the infos in the DOM
            document.title = `${product.name}`
            title.innerHTML = `${product.name}`
            img.innerHTML = `<img src=${product.imageUrl} alt=${product.altText}>`
            price.innerHTML = `${product.price}`
            description.innerHTML = `${product.description}`
            let displayColors = product.colors.map(color => { // map all colors because it is returned as an array
                return `<option value=${color}>${color}</option>`
            })
            displayColors = displayColors.join('') //join all the code and insert it
            color.innerHTML = displayColors
        })      
}
getProductInfo()

const addToCart = document.getElementById('addToCart')
const quantity = document.getElementById('quantity')

// add the product to the local storage
addToCart.addEventListener('click', () => {
    let productsString = localStorage.getItem('products') // get all items from localstorage
    let products = []
    if(productsString) { // if it exist, return the object
        products = JSON.parse(productsString)
    }
    // create a product to be verified
    let productToCheck = {
        id : `${id}`,
        quantity : parseInt(quantity.value),
        color : color.value,
    }
    if (productToCheck.quantity === 0 || productToCheck.quantity < 0) { // if the quantity is either negative or null
        alert("Veuillez ajouter au moins un produit.")
        productToCheck.quantity = 1
        quantity.value = productToCheck.quantity.toString()
    } else if(productToCheck.quantity <= 100){ // quantity must be inferior to 100
        // if there's already a product with same color and same id
        if(products.find(product => {
                if(product.id === productToCheck.id && product.color === productToCheck.color) {
                    // add the product quantity to the one already existing 
                product.quantity = productToCheck.quantity + product.quantity
                if(product.quantity > 100) { //check if the total quantity isn't superior to 100
                    alert("Vous ne pouvez pas avoir plus de 100 produits du même objet.")
                    product.quantity = 100
                }
                return product = {
                    id : product.id,
                    quantity : product.quantity,
                    color : product.color,
                }
            }
        })){
            alert("Votre panier est bien mis à jour.")
        } else {
            //  add the product to the list
                countOfProducts = products
                                    .push(productToCheck)
                alert("Le produit a bien été ajouté à votre panier")
        }
    } else {
        alert("Vous ne pouvez acheter plus de 100 produits du même objet")
    }
        productsString = JSON.stringify(products)
        localStorage.setItem('products', productsString) //update localStorage
}
)