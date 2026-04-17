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
let currentEditId = null;
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
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((createdProduct) => {
      alert("Created!");
      loadProducts();
      form.reset();
    });
});
modifyBtn.addEventListener("click", function () {
  if (!currentEditId) {
    return alert("Seleziona un prodotto dalla lista");
  }

  const updatedProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
    brand: brandInput.value,
  };

  fetch(apiLink + currentEditId, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore modifica");
      return res.json();
    })
    .then(() => {
      alert("Prodotto modificato!");
      currentEditId = null;
      form.reset();
      loadProducts();
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
const loadProducts = function () {
  fetch(apiLink, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => res.json())
    .then((products) => {
      const list = document.getElementById("productsList");
      list.innerHTML = "";
      products.forEach((product) => {
        const li = document.createElement("li");
        li.classList.add(
          "d-flex",
          "justify-content-between",
          "mb-2",
          "align-items-center",
        );

        li.innerHTML = `
          <span>${product.name} - ${product.price}€</span>
          <div class="d-flex gap-2 ms-2">
            <button class="editBtn btn btn-yellow btn-sm">Edit</button>
            <button class="deleteBtn btn btn-red btn-sm">Delete</button>
          </div>
        `;
        li.querySelector(".editBtn").addEventListener("click", () => {
          nameInput.value = product.name;
          descriptionInput.value = product.description;
          imageUrlInput.value = product.imageUrl;
          brandInput.value = product.brand;
          priceInput.value = product.price;

          currentEditId = product._id;
        });
        li.querySelector(".deleteBtn").addEventListener("click", () => {
          fetch(apiLink + product._id, {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
            },
          }).then(() => loadProducts());
        });

        list.appendChild(li);
      });
    })
    .catch(console.log);
};
loadProducts();
