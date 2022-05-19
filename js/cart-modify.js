// add or remove a product directly from the cart

setTimeout(() => {
    let itemQuantity = cartItems.getElementsByClassName('itemQuantity')
    let productPrices = document.querySelectorAll('.cart__item__content__description > p:last-child')
    let deleteItems = cartItems.getElementsByClassName('deleteItem')

    // loop through every iteration of the products
    for(i = 0; i< itemQuantity.length; i++) { 
        let item = itemQuantity[i]
        let product = productsAdded[i]
        let productPrice = productPrices[i]
        let deleteItem = deleteItems[i]
        let index = i

        // update the cart
        item.addEventListener('change', (e) => {
            newQuantity = parseInt(e.currentTarget.value)
            let quantityToAdd = newQuantity - product.quantity
            // update the new product quantity and price
            product.quantity = parseInt(newQuantity)
            priceOfProduct = newQuantity * product.price
            productPrice.textContent = `${parseInt(priceOfProduct)} €`
            // update the total quantity and price
            total = total + parseInt(quantityToAdd)
            totalQuantity.innerHTML = parseInt(total)

            price = price + parseInt(product.price * quantityToAdd)
            totalPrice.innerHTML = parseInt(price)
    
            // add the updated array to localStorage
            productsAddedString = JSON.stringify(productsAdded)
            localStorage.setItem('productsAdded', productsAddedString)
        })

        // delete an item from the cart
        deleteItem.addEventListener('click', (e) => {
            // delete from the products and from the page
            e.currentTarget.closest('.cart__item').remove()
            productsAdded.splice(index, 1)

            // get the quantity to retrieve 
            quantityToAdd = -(e.currentTarget.closest('.cart__item').querySelector('.itemQuantity').value)

            // update the total quantity
            total = total + parseInt(quantityToAdd)
            totalQuantity.innerHTML = parseInt(total)

            price = price + parseInt(product.price * quantityToAdd)
            totalPrice.innerHTML = parseInt(price)
            alert("Votre panier est bien mis à jour")
    
            // add the updated array to localStorage
            productsAddedString = JSON.stringify(productsAdded)
            localStorage.setItem('productsAdded', productsAddedString)
        })
    }
}, 3000)