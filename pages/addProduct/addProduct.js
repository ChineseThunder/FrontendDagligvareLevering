const URL = "http://localhost:8080/api/products"

export function initAddProduct(match) {
  document.getElementById("btn-add-product").onclick = addProduct
}
function addProduct() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({

    "name": document.getElementById("name_input").value,
    "price": document.getElementById("price_input").value,
    "weight": document.getElementById("weight_input").value
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch(URL, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}