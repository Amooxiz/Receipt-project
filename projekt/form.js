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
  } else {
    showMsg(nameInput, "");
  }

  if (!validateNumber(quantityInput)) {
    showMsg(quantityInput, "Number must be positive");
    isValidated = false;
  } else {
    showMsg(quantityInput, "");
  }

  if (!validateNumber(priceInput)) {
    showMsg(priceInput, "Number must be positive");
    isValidated = false;
  } else {
    showMsg(priceInput, "");
  }

  return isValidated;
}

function clearBox(id) {
  document.getElementById(id).innerHTML = "";
}

// function createTable(array, product) {
//     clearBox("PForm");
//     let div = document.getElementById("PForm");

//     const tbl = document.createElement("table");
//     const tblBody = document.createElement("tbody");

//     for (let i = -1; i < array.length; i++) {
//         const row = document.createElement("tr");

//         if (i === -1)
//         {
//             for (var prop in product) {
//                 if (Object.prototype.hasOwnProperty.call(product, prop)) {
//                     const cell = document.createElement("td");
//                     const cellTxt = document.createTextNode(prop);

//                     cell.appendChild(cellTxt);
//                     row.appendChild(cell);
//                 }
//             }
//             tblBody.appendChild(row);
//             continue;
//         }

//         for (const [key, value] of Object.entries(array[i])) {
//             const cell = document.createElement("td");
//             const cellTxt = document.createTextNode(value);

//             cell.appendChild(cellTxt);
//             row.appendChild(cell);

//         }
//         tblBody.appendChild(row);
//     }

//     tbl.appendChild(tblBody);

//     //document.body.appendChild(tbl);
//     div.appendChild(tbl);
//     tbl.setAttribute("border", "2");
// }

const createTd = (value) => {
  const cell = document.createElement("td");
  cell.innerText = value;
  return cell;
};

const form = document.querySelector("#productForm");
const table = document.getElementsByTagName("table")[0];
const products = [];
localStorage.setItem("products", JSON.stringify(products));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    validateFields(
      form.elements["name"],
      form.elements["quantity"],
      form.elements["price"]
    )
  ) {
    const product = {
      id: Math.random(),
      name: form.elements["name"].value,
      quantity: form.elements["quantity"].value,
      price: form.elements["price"].value,
      sum: form.elements["quantity"].value * form.elements["price"].value,
    };
    // const prodcutsFormLS = localStorage.getItem("products") || [];
    // const arr = JSON.parse(prodcutsFormLS);
    products.push(product);
    const tr = document.createElement("tr");
    table.append(tr);
    table.append(createTd(products.length));
    table.append(createTd(product.name));
    table.append(createTd(product.quantity));
    table.append(createTd(product.price));
    table.append(createTd(product.sum));
    localStorage.setItem("products", JSON.stringify(products));
    // localStorage.products = JSON.stringify(arr);
  }
});
