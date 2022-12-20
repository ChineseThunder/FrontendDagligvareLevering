//Add id to this URL to get a single user
import {sanitizeStringWithTableRows} from "../../utils.js";

const URL = "http://localhost:8080/api/products/"

export async function initFindProduct(match) {
    document.getElementById("btn-fetch-product").onclick = fetchProduct
    if (match?.params?.id) {
        const id = match.params.id
        try {
            renderProduct(id)
        } catch (err) {
            document.getElementById("error").innerText = "Could not find product: " + id
        }
    }
}

async function fetchProduct() {
    document.getElementById("error").innerText = ""
    const id = document.getElementById("product-id-input").value
    if (!id) {
        document.getElementById("error").innerText = "Please provide an id"
        return
    }
    try {
        renderProduct(id)
    } catch (err) {
        console.log("UPS " + err.message)
    }
}

async function renderProduct(id) {
    try {
        const product = await fetch(URL + id).then(res => res.json())
        //jsonplaceholder returns an empty object for users not found, NOT an error
        if (Object.keys(product).length === 0) {  //checks for an empty object = {}
            throw new Error("No user found for id:" + id)
        }

        document.getElementById("id").innerText = product.id;
        document.getElementById("name").innerText = product.name;
        document.getElementById("price").innerText = product.price;
        document.getElementById("weight").innerText = product.weight;
    } catch (err) {
        document.getElementById("error").innerText = err
    }
}