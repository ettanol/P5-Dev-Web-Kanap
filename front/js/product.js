let pageTitle = document.title
const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const color = document.getElementById('colors')

function getProductInfo() {
    // get the parameter from the URL
    const params = new
    URLSearchParams(document.location.search)
    const id = params.get("_id")

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
let productsAdded = []
const params = new
URLSearchParams(document.location.search)
const id = params.get("_id")

function addToLocalStorage() {
    if (productsAdded.length === 0 ) { 
        // add a product to the list
        productsAdded = [{
                                id : `${id}`,
                                quantity : parseInt(quantity.value),
                                color : color.value
                            }]
    } else {
        let productToCheck = [
            {
                id: `${id}`,
                quantity : parseInt(quantity.value),
                color : color.value
            }
        ]
        console.log(productToCheck.quantity)
        for (i = 0; i < productsAdded.length; i++) {
            // get the product to check
            // if the color of the product to add is already in the list with the same id
            if (productToCheck.color === productsAdded[i].color && productToCheck.id === productsAdded[i].id) {
                // add the quantity of the two products
                let countOfProducts = productsAdded
                                        .push({
                                            id : productsAdded[i].id,
                                            quantity : productToCheck.quantity + productsAdded[i].quantity,
                                            color : productsAdded[i].color
                                        })
                                        // retrieve the element that was already there from the list
                                        productsAdded.splice(i, 1)
            } else {
                // add the new product tot he list
            countOfProducts = productsAdded
                                .push(productToCheck)
            }
        }
    }
    localStorage.setItem('productsAdded', JSON.stringify(productsAdded))
}

addToCart.addEventListener('click', addToLocalStorage)
