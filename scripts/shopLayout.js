import {productsClassed as products} from "../data/products.js";
import {cart, saveCart} from "./cart.js";

function addHTML(type) {
    const filteredProducts = products.filter((productDetails) => productDetails.type === type);
    let layoutHTML = "";

    filteredProducts.forEach((filteredProducts) => {
        layoutHTML += 
        `<div class=productSquare>
            <img class="outline" src=${filteredProducts.img}>
            <p>${filteredProducts.name}</p>
            <p>£${(filteredProducts.cost/100).toFixed(2)}</p>
            <button data-product-name="${filteredProducts.name}" class="js-addToCart btn">Add to cart</button>
        </div>`
    })

    return layoutHTML;
}

const orderLayoutEclair = document.querySelector(".eclair");
const orderLayoutMaccaron = document.querySelector(".maccaron");
const orderLayoutSouffle = document.querySelector(".souffle");
const orderLayoutOpera = document.querySelector(".opera");
const orderLayoutMoose = document.querySelector(".moose");

orderLayoutEclair.innerHTML = addHTML("eclair");
orderLayoutMaccaron.innerHTML = addHTML("maccaron");
orderLayoutSouffle.innerHTML = addHTML("souffle");
orderLayoutOpera.innerHTML = addHTML("opera");
orderLayoutMoose.innerHTML = addHTML("moose");

document.querySelectorAll(".js-addToCart").forEach((addButton) => {
    addButton.addEventListener("click", addToCart => {
        let productName = addButton.dataset.productName;
        let matchingItem;
        cart.forEach((item) => {
            if(item.name === productName) {
                matchingItem = item;
            }
        })

        if(matchingItem) {
            matchingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                quantity: 1
            })
        }

        saveCart();
    })
})


