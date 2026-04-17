const apiLink = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.getElementById("form");
const allTheParameters = new URLSearchParams(location.search);
const imageId = allTheParameters.get("id");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");
const deleteBtn = document.getElementById("deleteBtn");
const modifyBtn = document.getElementById("modifyBtn");
const title = document.querySelector("h1");
if (imageId) {
  title.innerText = "Modify Trip";

  fetch(apiLink + imageId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => res.json())
    .then((details) => {
      nameInput.value = details.name;
      descriptionInput.value = details.description;
      imageUrlInput.value = details.imageUrl;
      brandInput.value = details.brand;
      priceInput.value = details.price;
    })
    .catch(console.log);
} else {
  title.innerText = "Add Trip";
}
class Product {
  constructor(_name, _description, _imageUrl, _price, _brand) {
    this.name = _name;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.price = _price;
    this.brand = _brand;
  }
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (imageId) {
    alert("Use Modify");
    return;
  }

  const newProduct = new Product(
    nameInput.value,
    descriptionInput.value,
    imageUrlInput.value,
    priceInput.value,
    brandInput.value,
  );
  fetch(apiLink, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => {
      if (res.ok) alert("Created!");
    })
    .catch(console.log);
});
modifyBtn.addEventListener("click", function () {
  if (!imageId) return alert("Nothing to modify");

  const updatedProduct = new Product(
    nameInput.value,
    descriptionInput.value,
    imageUrlInput.value,
    priceInput.value,
    brandInput.value,
  );

  fetch(apiLink + imageId, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => {
      if (res.ok) alert("It went well!");
    })
    .catch(console.log);
});
deleteBtn.addEventListener("click", function () {
  if (!imageId) return alert("No products");

  fetch(apiLink + imageId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => {
      if (res.ok) alert("Deleted!");
    })
    .catch(console.log);
});
