const allItems = document.querySelector("#items");

fetch("http://localhost:3000/api/products") 
    .then(res => {
        if(res.ok) {
            return res.json()
        }
    })
    .then( products => {
    let displayProducts = products.map(product => {
    return `<a href="./product.html?_id=${product._id}">
    <article>
      <img src=${product.imageUrl} alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}.</p>
    </article>
  </a>`;
  })
  displayProducts = displayProducts.join('')

  allItems.innerHTML = displayProducts
});