let container = document.createElement("div");
let row = document.createElement("div");
let head = document.createElement("h1")
container.setAttribute("class","container");
row.setAttribute("class","row");
head.setAttribute("id", "title");
head.setAttribute("class", "text-center");
head.innerText = "Check your Weather in All Country";

async function country(){
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    row.innerHTML="";

    for(let i = 0; i<data.length;i++){
        row.innerHTML+=` 
        
        <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 bg-light g-5">
        <div class="card h-100 w-auto" style="width: 18rem;" id="card">
          <div class="card-header text-center" id="country-name">${data[i].name.common}</div>
            <img src="${data[i].flags.svg}" class="card-img-top" alt='country-cards'>
            <div class="card-body text-center">
            <div class="card-text"><b><i>Region : </i></b>${data[i].region}</div>
            <div class="card-text"><b><i>Country-code : </i></b>${data[i].altSpellings[0]}</div>
            <div class="card-text"><b><i>Capital : </i></b>${data[i].capital}</div>
            <div class="card-text"><b><i>Population : </i></b>${data[i].population}</div>
            <div id="${data[i].name.common}"></div>
              <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-danger" onClick="weather(${data[i].latlng[0]},${data[i].latlng[1]},'${data[i].name.common}')">click for weather</button>
              </div>
          </div>
        </div>`;
    }
}

async function weather(lat, lon, id){
    let weatherreport = document.getElementById(id);
    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ff7e49eb4fd19463836219b0feb2529f&units=metric`);
    const data1 = await response1.json();

    weatherreport.innerHTML=`<div class="card-text"><b><i>Weather : </i></b>${data1.weather[0].main}</div>
    <div class="card-text"><b><i>Temperature : </i></b>${data1.main.temp} &#8451;</div>

  `;


}

document.body.appendChild(container);
container.append(head, row);

setTimeout(country, 1000);
