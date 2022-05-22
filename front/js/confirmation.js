const order = document.getElementById('orderId')

// get orderID from the URL
const params = new
URLSearchParams(document.location.search)
const orderId = params.get("orderID")

order.innerHTML = orderId