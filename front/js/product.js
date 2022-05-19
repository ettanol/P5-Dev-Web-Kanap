let pageTitle = document.title
const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const color = document.getElementById('colors')

const params = new
URLSearchParams(document.location.search)
const id = params.get("_id")

function getProductInfo() {
    // get the parameter from the URL

    // fetch the product in the API 
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(res => {
            if(res.ok) {
            return res.json()
            }
        })
        .then(product => {
            // display the infos in the DOM
            pageTitle.value = product.name
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

// add the product to the local storage
const addToCart = document.getElementById('addToCart')
const quantity = document.getElementById('quantity')

function addToLocalStorage() {
    if (localStorage.length === 0) { 
        var productsAdded = []
        // add a product to the list
        var product = {
                        id : `${id}`,
                        quantity : parseInt(quantity.value),
                        color : color.value,
                        price : parseInt(price.innerHTML)
        }
        var countOfProducts = productsAdded.push(product)
        alert("Le produit a bien été ajouté à votre panier")
    } else {
        let productsAddedString = localStorage.getItem('productsAdded')
        productsAdded = JSON.parse(productsAddedString)
        let productToCheck =
            {
                id: `${id}`,
                quantity : parseInt(quantity.value),
                color : color.value,
                price : parseInt(price.innerHTML)

            }
            // if the element with the same id and color if found
            if(productsAdded.find(product => {
                    if(product.id === productToCheck.id && product.color === productToCheck.color) {
                        // add the product quantity to the one already existing 
                    product.quantity = productToCheck.quantity + product.quantity
                    return product = {
                        id : product.id,
                        quantity : product.quantity,
                        color : product.color,
                        price : product.price
                    }
                }
            })){
                alert("Votre panier est bien mis à jour")
            } else {
                //  add the product to the list
                countOfProducts = productsAdded
                                    .push(productToCheck)
                alert("Le produit a bien été ajouté à votre panier")
            }

        }
        let productsAddedString = JSON.stringify(productsAdded)
        localStorage.setItem('productsAdded', productsAddedString)
}


addToCart.addEventListener('click', addToLocalStorage)
