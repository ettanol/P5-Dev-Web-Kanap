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

function addToLocalStorage() {
    const params = new
    URLSearchParams(document.location.search)
    const id = params.get("_id") 
    let productSelected = [
        {
            id : `${id}`,
            quantity : quantity.value,
            color : color.value
        }
    ]
    localStorage.setItem('productSelected', JSON.stringify(productSelected))
}

addToCart.addEventListener('click', addToLocalStorage)
