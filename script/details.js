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
                <img src="${products.imageUrl}" class="card-img-top p-3" alt="concert stock picture">
                <div class="card-body text-center">
                    <h5 class="card-title">${products.name}</h5>
                    <p class="card-text">${products.description}</p>
                    <p class="card-text">${products.brand}</p>
                    <p class="card-text">${products.price}€</p>
                    <a href="./homepage.html"><button class="btn-green rounded-1 w-50 text-center">Go back</button></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .catch((err) => {
      console.log(err);
    });
};

getDetails();
