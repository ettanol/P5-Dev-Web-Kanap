
setTimeout(() => {
    let deleteItems = cartItems.getElementsByClassName('deleteItem')
    for(i = 0; i< deleteItems.length; i++) { 
        let deleteItem = deleteItems[i]
        let index = i
        deleteItem.addEventListener('click', (e) => {
            e.currentTarget.closest('.cart__item').remove()
            productsAdded.splice(index, 1)
    
            // add the updated array to localStorage
            productsAddedString = JSON.stringify(productsAdded)
            localStorage.setItem('productsAdded', productsAddedString)
        })
    }
}, 3000)