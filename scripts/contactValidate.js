document.querySelector(".js-submitButton").addEventListener(("click"), () => {
    let contactEmail = document.querySelector(".js-contactEmail");
    let contactName = document.querySelector(".js-contactName");
    let contactTextArea = document.querySelector(".js-contactTextArea");

    let fieldsRequired = document.querySelector(".js-fieldsRequired");
    let validEmail = document.querySelector(".js-validEmail");

    let form = document.querySelector(".js-contactForm");
    let submitted = document.querySelector(".js-submittedContact");

    if(!contactEmail.value || !contactTextArea.value || !contactName.value) {
        fieldsRequired.style.display = "block";
    } else {
        fieldsRequired.style.display = "none";
        if(!validateEmail(contactEmail.value)) {
            validEmail.style.display = "block";
        } else {
            form.style.display = "none";
            submitted.style.display = "block";

            validEmail.style.display = "none";
        }
    }
})

function validateEmail(email) {
    let emailRegex = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$");
    return emailRegex.test(email);
}

