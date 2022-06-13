const allItems = document.querySelector("#items");

// get all products available and display on the page
fetch("http://localhost:3000/api/products") // fetch all the products from the API
    .then(res => {
        if(res.ok) {
            return res.json() // return all products as an object
        }
    })
    .then( products => {
    let displayProducts = products.map(product => { //create another array with all HTML infos
    return `<a href="./product.html?_id=${product._id}">
    <article>
      <img src=${product.imageUrl} alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}.</p>
    </article>
  </a>`;
  })
  displayProducts = displayProducts.join('') // join all elements of the array

  allItems.innerHTML = displayProducts // insert the HTML code in the page
});