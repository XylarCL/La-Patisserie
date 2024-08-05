import { cart, saveCart } from "../scripts/cart.js";
import { getProduct } from "../data/products.js";

function renderSummary() {
    if(!cart.length){
        document.querySelector(".js-emptyCart").innerHTML = `<h1 class="empty-cart"> Your cart is empty </h1>`
        document.querySelector(".js-orderSummary").style.display = "none";
        document.querySelector(".js-productSummary").style.display = "none";
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
    console.log(cart);

    cart.forEach((cartItem) => {
        currentProduct = getProduct(cartItem.name);

        productHTML += 
        `<div class="productSummaryBox"> 
            <img class="outline" src="${currentProduct.img}">
            <div class="productSummaryInfo">
                <p>${currentProduct.name}</p>
                 <p> Cost £${(currentProduct.cost/100).toFixed(2)}</p>
                <p>Quantity
                    <input data-product-name="${currentProduct.name}" maxlength="2" 
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" 
                    class="quantityInput js-quantityInput" type="number" 
                    value="${cartItem.quantity}">
                </p>
            </div>
            <button data-product-name="${currentProduct.name}" class="productSummaryRemove js-product-summary-remove btn">&#10006</button> 
        </div>`
    })

    let productSummaryHTML = document.querySelector(".js-productSummary")
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
    <p> Total Cost: £${(totalCost/100).toFixed(2)} </p>
    <form>
        <label>Collection date:</label>
        <input type="date" min="${forniteDate}" class="dateInput js-dateInput"> 
        <p>Please note orders must be placed 2 weeks in advance.</p>
        <label>Email:</label>
        <input type="text" class="orderEmail js-orderEmail">
        <button type="button" class="btn js-checkoutButton">Checkout</button>
    </form>`
    
    document.querySelector(".js-orderSummary").innerHTML = summaryHTML;
}

//Quantity Updater
function quantityUpdater() {
    document.querySelectorAll(".js-quantityInput").forEach((quantityInput) => {
        quantityInput.addEventListener("input", () => {
            cart.forEach((cartItem) => {
                if(quantityInput.dataset.productName === cartItem.name) {
                    cartItem.quantity = parseInt(quantityInput.value);
                }
                if(cartItem.quantity === 0) {
                    cartItem.quantity = 1;
                    quantityInput.value = 1;
                }
            })
            saveCart();
            renderDelivery();
        })
    } )
}

//Remove button
function removeButtons() {
    document.querySelectorAll(".js-product-summary-remove").forEach((removeButton) => {
        removeButton.addEventListener("click", () => {
            cart.forEach((cartItem, index) => {
                if(removeButton.dataset.productName === cartItem.name) {
                    cart.splice(index, 1);
                }
            })
            renderSummary();
        })
    })
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
    document.querySelector(".js-checkoutButton").addEventListener("click", checkoutRender.bind(this))
}

function checkoutRender() {
    let emailInput = document.querySelector(".js-orderEmail");
    let dateInput = document.querySelector(".js-dateInput");
    let fieldsRequired = document.querySelector(".js-fieldsRequired")
    let validEmail = document.querySelector(".js-validEmail")

    if(!emailInput.value || !dateInput.value) {
        fieldsRequired.style.display = "block";
    } else {
        fieldsRequired.style.display= "none";
        if(validateEmail(emailInput.value)){
            let checkoutHTML = 
            `<p>Confirmation has been sent to ${emailInput.value}</p>
            <p>Your order will be available for collection on ${dateInput.value}</p>
            <p> This is an example website. There is no order.</p>`
    
            document.querySelector(".js-orderConfirmation").innerHTML += checkoutHTML;
            document.querySelector(".js-emptyCart").style.display = "none";
            document.querySelector(".js-cartPage").style.display = "none";
            document.querySelector(".js-orderConfirmation").style.display = "flex";
        } else {
            validEmail.style.display = "block";
        }
    }
}

function validateEmail(email) {
    let emailRegex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$");
    return emailRegex.test(email);
}
renderSummary();