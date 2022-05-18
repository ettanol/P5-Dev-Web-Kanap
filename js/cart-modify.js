// add or remove a product directly from the cart

setTimeout(() => {
    let itemQuantity = cartItems.getElementsByClassName('itemQuantity')
    let productPrices = document.querySelectorAll('.cart__item__content__description > p:last-child')
    for(i = 0; i< itemQuantity.length; i++) { 
        let item = itemQuantity[i]
        let product = productsAdded[i]
        let productPrice = productPrices[i]
        item.addEventListener('change', (e) => {
            newQuantity = parseInt(e.currentTarget.value)
            let quantityToAdd = newQuantity - product.quantity
            // update the new product quantity and price
            product.quantity = parseInt(newQuantity)
            priceOfProduct = newQuantity * product.price
            productPrice.textContent = `${parseInt(priceOfProduct)} €`
            // update the total quantity
            total = total + parseInt(quantityToAdd)
            totalQuantity.innerHTML = parseInt(total)

            price = price + parseInt(product.price * quantityToAdd)
            totalPrice.innerHTML = parseInt(price)
    
            // add the updated array to localStorage
            productsAddedString = JSON.stringify(productsAdded)
            localStorage.setItem('productsAdded', productsAddedString)
        })
    }
}, 3000)