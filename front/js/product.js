let pageTitle = document.title
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
            pageTitle = `${product.name}`
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
    if (localStorage.length === 0) { 
        var products = []
        // add the product to the list
        var product = {
                        id : `${id}`,
                        quantity : parseInt(quantity.value),
                        color : color.value,
        }
        if (product.quantity !== 0) {
            var countOfProducts = products.push(product)
            alert("Le produit a bien été ajouté à votre panier")
        } else {
            alert("Veuillez ajouter au moins un produit.")
        }
    } else {
        // retrieve all products already added
        let productsString = localStorage.getItem('products')
        products = JSON.parse(productsString)
        let productToCheck =
            {
                id: `${id}`,
                quantity : parseInt(quantity.value),
                color : color.value,

            }
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
            if (productToCheck.quantity !== 0) {
                countOfProducts = products
                                    .push(productToCheck)
                alert("Le produit a bien été ajouté à votre panier")
            } else {
                alert("Veuillez ajouter au moins un produit.")
            }
        }
    }
        let productsString = JSON.stringify(products)
        localStorage.setItem('products', productsString)
}
)