const apiLink = "https://striveschool-api.herokuapp.com/api/product/";
const allTheParameters = new URLSearchParams(location.search);
const productId = allTheParameters.get("id");
const getDetails = function () {
  fetch(apiLink + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("error:");
      }
    })
    .then((products) => {
      document.getElementById("spinner").classList.add("d-none");
      const rowmytrip = document.getElementById("mytrip");
      rowmytrip.innerHTML = `
        <div class="col-12 col-md-6">
            <div class="card">
                <img src="${products.imageUrl}" class="card-img-top" alt="concert stock picture">
                <div class="card-body">
                    <h5 class="card-title">${products.name}</h5>
                    <p class="card-text">${products.description}</p>
                    <p class="card-text">${products.brand}</p>
                    <p class="card-text">${products.price}€</p>
                    <button class="btn-red" id="deleteBtn2">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
      document
        .getElementById("deleteBtn2")
        .addEventListener("click", deleteProduct());
    })
    .catch((err) => {
      console.log(err);
    });
};

getDetails();

function deleteProduct() {
  if (!productId) return alert("No product");

  fetch(apiLink + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Deleted!");
        window.location.href = "homepage.html";
      } else {
        throw new Error("Delete failed");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Err in delete!");
    });
}
