const pageTitle = document.title
const img = document.querySelector('.item__img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const color = document.getElementById('colors')

function getProductInfo() {
    // get the parameter from the URL
    let params = new
    URLSearchParams(document.location.search)
    let id = params.get("_id")
    console.log(id)

    // fetch the product in the API 
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(res => {
            if(res.ok) {
            return res.json()
            }
        })
        .then(product => {
            title = `${product.name}`
            img.innerHTML = `<img src=${product.imageUrl} alt=${product.altText}>`
            title.innerHTML = `${product.name}`
            price.innerHTML = `${product.price}`
            description.innerHTML = `${product.description}`
        })
}

getProductInfo()