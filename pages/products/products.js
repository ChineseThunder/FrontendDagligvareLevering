const URL = "http://localhost:8080/api/products"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initProducts() {
  document.getElementById("btn-add-product").onclick = addProduct
  document.getElementById("btn-get-all").onclick = getAllProducts
  getAllProducts()
}

export async function getAllProducts() {
  try {
    const ProductsFromServer = await fetch(URL).then(res => res.json())
    showAllData(ProductsFromServer)
  }
  catch (err) {
    console.error("Couldnt find products: " + err) //This can be done better
  }
}

function showAllData(data) {
  const tableRowsArray = data.map(products => `
  <tr>                                
    <td>${products.id} </td>              
    <td>${products.name} </td>                     
    <td>${products.price} </td>  
    <td>${products.weight} </td>
    <td>
  </tr>`)

  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
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
