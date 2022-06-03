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
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(res => {
            if(res.ok) {
            return res.json()
            }
        })
        .then(product => {
            // display the infos in the DOM
            document.title = `${product.name}`
            title.innerHTML = `${product.name}`
            img.innerHTML = `<img src=${product.imageUrl} alt=${product.altText}>`
            price.innerHTML = `${product.price}`
            description.innerHTML = `${product.description}`
            let displayColors = product.colors.map(color => {
                return `<option value=${color}>${color}</option>`
            })
            displayColors = displayColors.join('')
            color.innerHTML = displayColors
        })      
}
getProductInfo()

const addToCart = document.getElementById('addToCart')
const quantity = document.getElementById('quantity')

// add the product to the local storage
addToCart.addEventListener('click', () => {
    let productsString = localStorage.getItem('products')
    let products = []
    if(productsString) {
        products = JSON.parse(productsString)
    }
    // create a product to be verified
    let productToCheck = {
        id : `${id}`,
        quantity : parseInt(quantity.value),
        color : color.value,
    }
    if (productToCheck.quantity === 0) { 
        alert("Veuillez ajouter au moins un produit.")
    } else {
        // if there's already a product with same color and same id
        if(products.find(product => {
                if(product.id === productToCheck.id && product.color === productToCheck.color) {
                    // add the product quantity to the one already existing 
                product.quantity = productToCheck.quantity + product.quantity
                return product = {
                    id : product.id,
                    quantity : product.quantity,
                    color : product.color,
                }
            }
        })){
            alert("Votre panier est bien mis à jour")
        } else {
            //  add the product to the list
                countOfProducts = products
                                    .push(productToCheck)
                alert("Le produit a bien été ajouté à votre panier")
        }
    }
        productsString = JSON.stringify(products)
        localStorage.setItem('products', productsString)
}
)