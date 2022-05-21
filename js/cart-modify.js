// add or remove a product directly from the cart

setTimeout(() => {
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
        
        // update the cart
        item.addEventListener('change', (e) => {
            const updateCart = () => {
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
                            productsString = JSON.stringify(products)
                            localStorage.setItem('products', productsString)
                        })
                }
                getPrice()
            }
            updateCart()
        })

        // delete an item from the cart
        deleteItem.addEventListener('click', (e) => {
            // delete from the products and from the page
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
                        productsString = JSON.stringify(products)
                        localStorage.setItem('products', productsString)            
                    })
            }
            getPrice()
        })
    }
}, 3000)