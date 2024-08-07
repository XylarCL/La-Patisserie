import {productsClassed as products} from "../data/products.js";
import {cart, saveCart} from "./cart.js";

function generateLayout() {
    let HTML = "";
    let product=["eclair", "maccaron", "souffle", "opera", "moose"];

    product.forEach((type) => {
        HTML += addHTML(type);
    }) 

    return HTML;
}

function addHTML(type) {
    const filteredProducts = products.filter((productDetails) => productDetails.type === type);
    let layoutHTML = `    
        <hr>
        <h1>${type.charAt(0).toUpperCase() + type.slice(1)}</h1>`;

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

const orderLayout = document.querySelector(".shopPage");
orderLayout.innerHTML = generateLayout();

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
        playAnimation();
        saveCart();
    })
})


function playAnimation() {
    let cartHeader = document.querySelector(".js-cartHeader");
    cartHeader.classList.add('animationTrigger');
    setTimeout(()=> {
        cartHeader.classList.remove('animationTrigger')
    }, 300);
}