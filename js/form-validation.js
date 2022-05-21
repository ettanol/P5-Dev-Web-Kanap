const form = document.getElementsByClassName('cart__order__form__question')
const order = document.getElementById('order')

let isValidArray = [false, false, false, false, false]
let contact = ["", "", "", "", ""]

let productsString = localStorage.getItem('products')
let products = JSON.parse(productsString)

// verify if informations in the form are correct (using ReGex)
const matches = () => {
    for(i = 0; i< form.length; i++) {
        let formInput = form[i].children[1]
        let index = i
        formInput.addEventListener('change', (e) => {
            let name = e.currentTarget.name
            let value = e.currentTarget.value
            let expression = /^([\p{L}]{1,20}( |-|'|\.)? ?){1,4}/gu
            let array = value.split(' ')
            switch(name) {
                case("Prénom" || "Nom"): 
                array = [array.join(' ')]
                break 
                case ("Email") :
                expression = /^[-\p{L}0-9#!%$‘&+*–/=?^_`.{|}~]+@{1}[a-z]{1,15}\.{1}[a-z]{2,5}(\.[a-z]{2,5})?$/gu
                break
                case("Adresse") : 
                expression = /^([0-9]{1,4})?( +|,)?( *)([\p{L}]{2,9}\.?)( |-|')(([\p{L}]{2,12})( |-|')?){1,5}/gu
                array = [array.join(' ')]
                break
                case("Ville") : 
                expression = /^([0-9]{5})? ?([a-zA-Z\p{L}\p{M}]+( |-)?){1,4}/gu
                array = [array.join(' ')]
                break
            }
            let testResult = expression.test(value)
            if(testResult) {
                let match = value.match(expression)
                let isValid = false
                if (match[0] == array[0]) {
                    document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} valide`
                    isValid = true
                    contact.splice(index, 1, value)
                    isValidArray.splice(index, 1, isValid)
                } else {
                    document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} non valide`
                    isValid = false
                    isValidArray.splice(index, 1, isValid)
                }
            } else {
                document.getElementById(`${name}ErrorMsg`).innerHTML = `${name} non valide`
                isValid = false
                isValidArray.splice(index, 1, isValid)
            }
        })
    }
}
matches()

// get product IDs
let productsID = []
const getProductsID = () => {
    products.forEach(product => {
        fetch(`http://localhost:3000/api/products/${product.id}`)
        .then(res => {
            if(res.ok) {
                return res.json()
            }
        })
        .then(product => {
            let countOfProductsID = productsID.push(product)
            return productsID
        })
    })
}
getProductsID()

const productID = [
    {contact : contact},
    {products : productsID}
]


order.addEventListener('click', (e) => {
    e.preventDefault()
    if (isValidArray.includes(false)) {
        alert ("Veuillez vérifier le formulaire")
    } else {
        products.forEach( product => {
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(productID)
            })
        })
    }
})

