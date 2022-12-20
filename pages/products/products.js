const URL = "http://localhost:8080/api/products"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initProducts() {
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

