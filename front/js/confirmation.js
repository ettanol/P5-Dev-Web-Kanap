const orderID = document.getElementById('orderID')

// get orderID from the URL
const params = new
URLSearchParams(document.location.search)
const orderId = params.get("orderId")

orderID.innerHTML = orderId