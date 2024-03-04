// Fetching data about all countries from the specified API
var fet = fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    // Mapping through the retrieved data
    data.map((value) => {
      // Creating a new object using the spread operator
      var spreadOperator = {
        ...value,
        name: value.name.common,
        flag: value.flags.png,
        code: value.cioc,
        capital: value.capital,
        region: value.region,
        population: value.population,
        latitude: value.latlng[0],
        longitude: value.latlng[1],
      };
      // Calling the createcountry function with the new object as an argument
      createcountry(spreadOperator);
    });
  });

// Function to create a country card using the provided data
function createcountry({
  name,
  flag,
  code,
  capital,
  region,
  population,
  latitude,
  longitude,
}) {
  // Appending HTML content to the body, creating a card for each country
  document.body.innerHTML += ` <div class="container">
        <div class="card">
          <h1 id="title" class="text-center">${name}</h1>
          <img src="${flag}" class="flag" alt="${name}'Flag image">
          <div class="card-body car">
            <p><span>Population :</span>${population}</p>
            <p><span>Captial :</span> ${capital}</p>
            <p><span>Region :</span> ${region}</p>
            <p><span>Country Code :</span>${code}</p>
            <!-- Clicking this button triggers the block function with country's latitude, longitude, and name -->
            <a href="#" class="btn btn-primary" onclick=(block(${latitude},${longitude},${name})) >Click for Weather</a>
            <div id=${name}></div>
          </div>
        </div>
      </div>
    `;
}

// Function to fetch weather information using latitude and longitude
function block(lat, lng, name) {
  // Creating the Weather API URL with the provided latitude and longitude
  var WAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=06e423ec0af839c485470951f60c3f6b`;

  // Fetching weather data from the Weather API
  fetch(WAPI)
    .then((response) => response.json())
    .then((data) => {
      // Displaying an alert with the weather information for the selected country
      alert(`
        For ${name.id}  
        Current Humidity is ${data.main.humidity}
        Current Pressure is ${data.main.pressure}
        Current Temperature is ${data.main.temp}
      `);
    });
}

// Preventing default behavior for click events (not clear why this is added here)
document.addEventListener("click", (event) => event.preventDefault());
