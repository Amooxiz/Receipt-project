const form = document.querySelector("#productForm");
const table = document.getElementsByTagName("table")[0];
const editButton = document.getElementById("edit");
const submitButton = document.getElementById("submit");
const deleteButton = document.getElementById("delete");
const sumDiv = document.getElementById("summed")
let selectedRow = null;
let selectedIndex = null;
let products = JSON.parse(localStorage.getItem("products")) || [];






function hasTextValue(input) {
  if (input.value.trim() === "") {
    return false;
  }
  return true;
}

const selectProduct = (e) => {
  if(selectedRow!==null){

    selectedRow.style.backgroundColor = "rgb(85, 26, 163)"
  }
  selectedRow = e.currentTarget;
  selectedRow.style.backgroundColor = 'black';
  selectedIndex = +selectedRow.children[0].innerText - 1;
  form.elements["name"].value = selectedRow.children[1].innerText;
  form.elements["quantity"].value = selectedRow.children[2].innerText;
  form.elements["price"].value = selectedRow.children[3].innerText;
  editButton.disabled = false;
  deleteButton.disabled = false;
};
const sumUp = () =>{
  const sum = products.reduce((acc, obj)=> { return acc + obj.sum; }, 0) || 0;
  sumDiv.innerText = `SUMA: ${sum}`;
  if(products.length ===0){
    sumDiv.innerText = `SUMA: ${0}`;
  }
}
const fixProductsId = () => {
  products.forEach((product, index) => {
    product.id = index;
  });
  products.sort((a,b) =>a.id-b.id);
  const idCells = document.querySelectorAll("#id");
  idCells.forEach((element, index) => {
    element.innerHTML = index + 1;
  });
};
const deleteProduct = (event) => {
  event.preventDefault();
  selectedRow.remove();
  products = products.filter((product) => product.id !== selectedIndex);

  fixProductsId();
  editButton.disabled = true;
  deleteButton.disabled = true;
  clearForm();
  sumUp();
  selectedIndex = null;
  selectedRow = null;
  localStorage.setItem("products", JSON.stringify(products));
};
const editProduct = (event) => {
  event.preventDefault();
  selectedRow.children[1].innerText = form.elements["name"].value;
  selectedRow.children[2].innerText = form.elements["quantity"].value;
  selectedRow.children[3].innerText = form.elements["price"].value;
  selectedRow.children[4].innerText =
    +form.elements["price"].value * +form.elements["quantity"].value;
  products[selectedIndex] = {
    id: selectedIndex,
    name: form.elements["name"].value,
    quantity: +form.elements["quantity"].value,
    price: +form.elements["price"].value,
    sum: +form.elements["quantity"].value * +form.elements["price"].value,
  };
  editButton.disabled = true;
  deleteButton.disabled = true;
  clearForm();
  selectedRow.style.backgroundColor = "rgb(85, 26, 163)"
  selectedRow = null;
  selectedIndex = null;
  sumUp();
  localStorage.setItem("products", JSON.stringify(products));

};

const clearForm = () => {
  form.elements["name"].value = "";
  form.elements["quantity"].value = "";
  form.elements["price"].value = "";
};

const liftProduct = () => {
  if (selectedIndex !== 0) {
    const cells = document.querySelectorAll('#cell');
    const tempCell = cells.item(selectedIndex-1);
    const currCell = cells.item(selectedIndex);
    const copyTempCell = tempCell.cloneNode(true);
    const copyCurrCell = currCell.cloneNode(true);
    copyTempCell.addEventListener('click',selectProduct);
    copyCurrCell.addEventListener('click',selectProduct);
    copyCurrCell.childNodes[5].childNodes[0].addEventListener('click',liftProduct);
    copyTempCell.childNodes[5].childNodes[0].addEventListener('click',liftProduct);
    copyCurrCell.childNodes[5].childNodes[1].addEventListener('click',dropProduct);
    copyTempCell.childNodes[5].childNodes[1].addEventListener('click',dropProduct);
    currCell.replaceWith(copyTempCell);
    tempCell.replaceWith(copyCurrCell);  
    const tempProduct = products[selectedIndex];
    products[selectedIndex] = products[selectedIndex-1];
    products[selectedIndex-1] = tempProduct;
    fixProductsId();
    clearForm();
    copyCurrCell.style.backgroundColor =  "rgb(85, 26, 163)"
  }
};
const dropProduct = () =>{
  if(selectedIndex !== products.length-1){
    const cells = document.querySelectorAll('#cell');
    const tempCell = cells.item(selectedIndex+1);
    const currCell = cells.item(selectedIndex);
    const copyTempCell = tempCell.cloneNode(true);
    const copyCurrCell = currCell.cloneNode(true);
    copyTempCell.addEventListener('click',selectProduct);
    copyCurrCell.addEventListener('click',selectProduct);
    copyCurrCell.childNodes[5].childNodes[0].addEventListener('click',liftProduct);
    copyCurrCell.childNodes[5].childNodes[1].addEventListener('click',dropProduct);
    copyTempCell.childNodes[5].childNodes[0].addEventListener('click',liftProduct);
    copyTempCell.childNodes[5].childNodes[1].addEventListener('click',dropProduct);
    currCell.replaceWith(copyTempCell);
    tempCell.replaceWith(copyCurrCell);  
    const tempProduct = products[selectedIndex];
    products[selectedIndex] = products[selectedIndex+1];
    products[selectedIndex+1] = tempProduct;
    fixProductsId();
    copyCurrCell.style.backgroundColor =  "rgb(85, 26, 163)"
  }
}

editButton.addEventListener("click", editProduct);
deleteButton.addEventListener("click", deleteProduct);

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

const createTd = (value, field) => {
  const cell = document.createElement("td");
  cell.innerText = value;
  cell.id = field;
  return cell;
};

const createTdWithButtons = () => {
  const cell = document.createElement("td");
  const upButton = document.createElement("button");
  const downButton = document.createElement("button");
  upButton.innerText = "UP";
  downButton.innerText = "DOWN";
  upButton.id = "up";
  downButton.id = "down";
  downButton.id = "true";
  cell.append(upButton);
  cell.append(downButton);
  upButton.addEventListener("click", liftProduct);
  downButton.addEventListener("click", dropProduct);
  return cell;
};

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    validateFields(
      form.elements["name"],
      form.elements["quantity"],
      form.elements["price"]
    )
  ) {
    const product = {
      id: products.length,
      name: form.elements["name"].value,
      quantity: form.elements["quantity"].value,
      price: form.elements["price"].value,
      sum: form.elements["quantity"].value * form.elements["price"].value,
    };
    products.push(product);
    const tr = document.createElement("tr");
    tr.id = "cell";
    tr.addEventListener("click", selectProduct);

    tr.append(createTd(products.length, "id"));
    tr.append(createTd(product.name, "name"));
    tr.append(createTd(product.quantity, "quantity"));
    tr.append(createTd(product.price, "price"));
    tr.append(createTd(product.sum, "sum"));
    tr.append(createTdWithButtons());
    table.append(tr);
    localStorage.setItem("products", JSON.stringify(products));
    clearForm();
    // localStorage.products = JSON.stringify(arr);
    sumUp();
  }
});
products.forEach(product =>{
  const tr = document.createElement("tr");
  tr.id = "cell";
  tr.addEventListener("click", selectProduct);

  tr.append(createTd(product.id, "id"));
  tr.append(createTd(product.name, "name"));
  tr.append(createTd(product.quantity, "quantity"));
  tr.append(createTd(product.price, "price"));
  tr.append(createTd(product.sum, "sum"));
  tr.append(createTdWithButtons());
  table.append(tr);
})
