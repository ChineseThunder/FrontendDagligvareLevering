import {sanitizeStringWithTableRows} from "../../utils.js";

const URL = "http://localhost:8080/api/delivery"
const URL2 = "http://localhost:8080/api/delivery/"



export async function initAddDelivery(match) {
    document.getElementById("btn-add-delivery").onclick = addDelivery
    document.getElementById("btn-get-all-orders").onclick = getAllDeliveries
    getAllDeliveries()
    document.getElementById("btn-fetch-delivery").onclick = fetchDelivery
    if (match?.params?.id) {
        const id = match.params.id
        try {
            renderDelivery(id)
        } catch (err) {
            document.getElementById("error").innerText = "Could not find product: " + id
        }
    }

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
        const tableRowsArray = data.map(delivery => `
          <tr>                                
            <td>${delivery.id} </td>              
            <td>${delivery.deliveryDate} </td>                     
            <td>${delivery.fromWarehouse} </td> 
            <td>${delivery.destination} </td>  
            <td>
          </tr>`)

        const tableRowsString = tableRowsArray.join("\n")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function fetchDelivery() {
    document.getElementById("error").innerText = ""
    const id = document.getElementById("product-id-input").value
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id"
        return
    }
    try {
        renderDelivery(id)
    } catch (err) {
        console.log("UPS " + err.message)
    }
}

async function renderDelivery(id) {
    try {
        const delivery = await fetch(URL2 + id).then(res => res.json())
        //jsonplaceholder returns an empty object for users not found, NOT an error
        if (Object.keys(delivery).length === 0) {  //checks for an empty object = {}
            throw new Error("No user found for id:" + id)
        }
        document.getElementById("id_find").innerText = delivery.id;
        document.getElementById("deliverydate").innerText = delivery.deliveryDate;
        document.getElementById("fromWarehouse").innerText = delivery.fromWarehouse;
        document.getElementById("destination").innerText = delivery.destination;
    } catch (err) {
        document.getElementById("error").innerText = err
    }
}


