function hasTextValue(input) {

    if (input.value.trim() === "") {
        return false;
    }
    return true;
}

function validateNumber(input) {
    if (input.value <= 0) {
        return false;
    }
    return true;
}

function showMsg(input, message) {
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
}

function validateFields(nameInput, quantityInput, priceInput) {

    let isValidated = true;

    if (!hasTextValue(nameInput)) {
        showMsg(nameInput, "Field cannot be empty");
        isValidated = false;
    }
    else {
        showMsg(nameInput, "");
    }

    if (!validateNumber(quantityInput)) {
        showMsg(quantityInput, "Number must be positive");
        isValidated = false;
    }
    else {
        showMsg(quantityInput, "");
    }

    if (!validateNumber(priceInput)) {
        showMsg(priceInput, "Number must be positive");
        isValidated = false;
    }
    else {
        showMsg(priceInput, "");
    }

    return isValidated;
}

const form = document.querySelector("#productForm");

let products;


form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateFields(form.elements["name"], form.elements["quantity"], form.elements["price"])) {

        let product = {
            name: form.elements["name"].value,
            quantity: form.elements["quantity"].value,
            price: form.elements["name"].value,
            sum: form.elements["quantity"].value * form.elements["price"].value
        }
        //products.push(product);
        console.log(product);
        //console.log(products);
    }


})