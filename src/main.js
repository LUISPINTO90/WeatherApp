import dateBuilder from "./dateBuilder.js";

let searchInput = document.getElementById("SearchInput");
let btnSearch = document.getElementById("BtnSearch");

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchInput.value == "") {
    Swal.fire({
      title: "Error!",
      text: "No value entered",
      footer: "Please enter a value",
      confirmButtonText: "Ok",
      buttonsStyling: false,
      customClass: {
        title: "title",
        text: "paragraph",
        confirmButton: "btn",
      },
    });
    return;
  }

  let apiKey = "6689fcffce61d578034304e1f128745e";
  let cityName = searchInput.value;
  let url = `https://api.openweathermap.org/data/2.5/find?q=${cityName}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error getting data from API");
    })
    .then((data) => {
      console.log(data);
      Swal.fire({
        html: `
        <section>
          <p class="paragraph">
            ${dateBuilder(new Date())}
          </p>
        </section>
          ${data.list
            .map((city) => {
              return `
            <section>
              <h1 class="cityH1">${city.name}, ${city.sys.country}</h1>
              <p class="temperature">${Math.round(city.main.temp)}°c</p>
              <p class="weather">${city.weather[0].main}</p>
            </section>
            `;
            })
            .join("")}
          `,
        confirmButtonText: "Ok",
        buttonsStyling: false,
        customClass: {
          title: "title",
          text: "paragraph",
          confirmButton: "btn",
        },
      });
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "City not found",
        footer: "Choose a valid city",
        confirmButtonText: "Ok",
        buttonsStyling: false,
        customClass: {
          title: "title",
          text: "paragraph",
          confirmButton: "btn",
        },
      });
    });

  searchInput.value = "";
});
