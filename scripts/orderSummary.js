import { cart, saveCart } from "../scripts/cart.js";
import { getProduct } from "../data/products.js";

function renderSummary() {
    if(!cart.length){
        document.querySelector(".empty-cart-text").innerHTML = `<h1 class="empty-cart"> Your cart is empty </h1>`
        document.querySelector(".order-summary-page").style.display = "none";
    }
    else {
        renderProducts()
        renderDelivery();
        quantityUpdater();
        removeButtons();
        checkoutButton();
    }
    saveCart();
}

function renderProducts() {
    let productHTML = "";
    let currentProduct;
    let totalCost = 0;

    cart.forEach((cartItem) => {
        currentProduct = getProduct(cartItem.name);

        productHTML += 
        `<div class="product-summary-box"> 
            <img src="${currentProduct.img}">
            <div class="product-summary-info">
                <p class="product-summary-name">${currentProduct.name}</p>
                 <p class="product-cost"> Cost: £${(currentProduct.cost/100).toFixed(2)}</p>
                <p class="product-quantity">Quantity:
                    <input data-product-name="${currentProduct.name}" maxlength="2" 
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" class="quantity-input" type="number" 
                    value="${cartItem.quantity}">
                </p>
                <button data-product-name="${currentProduct.name}" class="product-summary-remove btn">Remove</button> 
            </div>
        </div>`
    })

    let productSummaryHTML = document.querySelector(".productsSummary")
    productSummaryHTML.innerHTML = productHTML;
}

function renderDelivery() {
    let totalCost = 0;
    let currentProduct;

    //Workout total cost
    cart.forEach((cartItem) => {
        currentProduct = getProduct(cartItem.name);
        totalCost += currentProduct.cost * cartItem.quantity;
    })

    let summaryHTML = "";
    let forniteDate = new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString('en-CA');

    summaryHTML += `
    <p class="spacing"> Total Cost: £${(totalCost/100).toFixed(2)} </p>
    <p class="spacing"> Collection date: <input type="date" min="${forniteDate}" class="date-input"></p> 
    <p class="smallText">Please note orders must be placed 2 weeks in advance.</p>
    <p class="spacing"> Email:<input type="text" class="order-email"></p>
    
    <button class="btn checkoutButton">Checkout</button>`

    document.querySelector(".order-summary").innerHTML = summaryHTML;
}

//Quantity Updater
function quantityUpdater() {
    document.querySelectorAll(".quantity-input").forEach((quantityInput) => {
        quantityInput.addEventListener("input", () => {
            cart.forEach((cartItem) => {
                if(quantityInput.dataset.productName === cartItem.name) {
                    cartItem.quantity = parseInt(quantityInput.value);
                }
                if(quantityInput.value === "0") {
                    removeItem(quantityInput)
                }
            })
            saveCart()
            renderDelivery()
        })
    } )
}


//Remove button
function removeButtons() {
    document.querySelectorAll(".product-summary-remove").forEach((removeButton) => {
        removeButton.addEventListener("click", removeItem.bind(this, removeButton))
    } )
}

//Remove Item Function
function removeItem(removeButton) {
    cart.forEach((cartItem, index) => {
        if(removeButton.dataset.productName === cartItem.name) {
            cart.splice(index, 1);
        }
    })
    renderSummary();
}

//Checkout button
function checkoutButton() {
    document.querySelector(".checkoutButton").addEventListener("click", () => {
        document.querySelector(".empty-cart-text").style.display = "none";
        document.querySelector(".order-summary-page").style.display = "none";
        document.querySelector(".order-confirmation").style.display = "block";
        checkoutRender();
        
    })
}

function checkoutRender() {
    let emailInput = document.querySelector(".order-email");
    let dateInput = document.querySelector(".date-input");
    let checkoutHTML = `<p>Confirmation has been sent to ${emailInput.value || "your email"}</p>
    <p>Your order will be available for collection on ${dateInput.value}</p>
    <p class="smallText"> This is an example website. There is no order.</p>`
    document.querySelector(".order-confirmation").innerHTML += checkoutHTML;
}


renderSummary();