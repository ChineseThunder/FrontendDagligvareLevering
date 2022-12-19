import "https://unpkg.com/navigo"  //Will create the global Navigo object used below


import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { initNavigate } from "./pages/navigate/navigate.js"
import { showMatchObject } from "./pages/show-match/match.js"
import { initProducts } from "./pages/products/products.js"
import { initFindProduct } from "./pages/findProduct/findProduct.js"

window.addEventListener("load", async () => {

  const templateAbout = await loadHtml("./pages/about/home.html")
  const templateProducts = await loadHtml("./pages/products/products.html")
  const templateFindProduct = await loadHtml("./pages/findProduct/findProduct.html")
  const templateNavigate = await loadHtml("./pages/navigate/navigate.html")
  const templateMatch = await loadHtml("./pages/show-match/match.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")

  adjustForMissingHash()

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      "/home": () => renderTemplate(templateAbout, "content"),

      "/products": () => {
        renderTemplate(templateProducts, "content")
        initProducts()
      },
      "/find-product": (match) => {
        renderTemplate(templateFindProduct, "content")
        initFindProduct(match)
      },

      "/navigate-programatically": () => {
        renderTemplate(templateNavigate, "content")
        initNavigate()
      },

      "/show-match": (match) => {
        renderTemplate(templateMatch, "content")
        showMatchObject(match)
      }
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}