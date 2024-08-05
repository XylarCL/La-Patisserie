let popup = document.querySelector(".portfolioPopup");
let popupContinue = document.querySelector(".portfolioContinue");
let tomorrowsDate = new Date(new Date().setDate(new Date().getDate() + 1));


popupContinue.addEventListener("click", () => {
    popup.style.display = "none";
    document.cookie = `seenPopup = true; expires=${tomorrowsDate}`;
})

console.log("Cookie? " + document.cookie);
console.log(!decodeURIComponent(document.cookie));
if(!decodeURIComponent(document.cookie)) {
    popup.style.display = "flex";
}
