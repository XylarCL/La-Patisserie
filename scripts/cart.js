export let cart = loadCart() || [];

export function saveCart() {
    return localStorage.setItem("cartSave", JSON.stringify(cart));
}

export function loadCart() {
    return JSON.parse(localStorage.getItem("cartSave"));
}
/*JSON.parse(localStorage.get("cartSave")) || */