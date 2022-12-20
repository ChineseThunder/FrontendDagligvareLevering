import {sanitizeStringWithTableRows} from "../../utils.js";

const URL = "http://localhost:8080/api/delivery"


export async function initAddDelivery(match) {
    document.getElementById("btn-add-delivery").onclick = addDelivery
    document.getElementById("btn-get-all-orders").onclick = getAllDeliveries
    getAllDeliveries()
}

function addDelivery() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "fromWarehouse": document.getElementById("fromWarehouse_id").value,
        "destination": document.getElementById("destination_id").value
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

export async function getAllDeliveries() {
    try {
        const ProductsFromServer = await fetch(URL).then(res => res.json())
        showAllData(ProductsFromServer)
    } catch (err) {
        console.error("Couldnt find products: " + err) //This can be done better
    }
}

function showAllData(data) {
        const tableRowsArray = data.map(orders => `
          <tr>                                
            <td>${orders.id} </td>              
            <td>${orders.deliveryDate} </td>                     
            <td>${orders.fromWarehouse} </td> 
            <td>${orders.destination} </td>  
            <td>
          </tr>`)

        const tableRowsString = tableRowsArray.join("\n")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)

}



