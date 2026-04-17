const apiLink = "https://striveschool-api.herokuapp.com/api/product/";
const getProducts = function () {
  fetch(apiLink, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQwYTczOWY4NzAwMTU3YWIwODAiLCJpYXQiOjE3NzY0MDk4NjcsImV4cCI6MTc3NzYxOTQ2N30.vXu5VijLatM_t3Qk_PBQhYyez-FJEBaiAC6UUWuAk_Y",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((data) => {
      document.getElementById("spinner").classList.add("d-none");
      data.forEach((product) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
          <div class="card h-100 d-flex flex-column align-content-between">
            <img src="${product.imageUrl}" class="card-img-top img-fluid p-3" style="max-height:400px;"alt="immagine prodotto">
            <div class="card-body">
              <h5 class="card-title text-center text-info text-capitalize">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">${product.brand}</p>
              <p class="card-text">${product.price}€</p>
              <a href="./details.html?id=${product._id}" class="btn btn-green">
                Details
              </a>
            </div>
          </div>
        `;
        const productrow = document.getElementById("product-row");
        productrow.appendChild(newCol);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

getProducts();
