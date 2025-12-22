//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const writeCity = document.querySelector('#serachInput');
const findCitybtn = document.querySelector('#findcitybtn');
const findbyloc = document.querySelector('#findbylocation');
const showError = document.querySelector('#show-Error');
const dayOne = document.querySelector('#day-one')
const datawrapper = document.querySelector('#data-wrapper');
const datacontainer = document.querySelector('#data-container');
const imgArea = document.querySelector('#img-area');
const showErrorApi = document.querySelector("#show-error-api");
const overLay = document.querySelector('.overlay');
const recentSearch = document.querySelector('#recent-search');
//const cityName = writeCity.value;


let CountryNotPresent = false;
function getDatalocalstorage(){
    return JSON.parse(localStorage.getItem("APIDATA")) || []
}  

function setDatalocalstorage(Apidata){
    localStorage.setItem("APIDATA" , JSON.stringify(Apidata));
}

// get and set the reset cities
function getRecentCities(){
    return JSON.parse(localStorage.getItem("cities")) || []
}  

function setRecentCities(CityList){
    localStorage.setItem("cities" , JSON.stringify(CityList));
}

// the getwatherbylocation function
function getWeatherByLocation() {
  if (!navigator.geolocation) {
    showErrorApi.innerHTML = "Geolocation is not supported by this browser.";
    overLay.classList.remove('display_none');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
                fetchWeather({
                  lat : position.coords.latitude,
                  lon : position.coords.longitude
                });
     },
     () => {
      showErrorApi.innerHTML = "Location access denied. Please allow location access.";
      overLay.classList.remove('display_none');
    }
  );
}

// render the View
function renderData(data){
    datacontainer.innerHTML  = ''
    dayOne.innerHTML = "";
    imgArea.innerHTML = ''
    const Createh2 = document.createElement('H2');
    Createh2.innerHTML = data.city.name;
    Createh2.classList.add('font-bold','text-xl');
    const createDate = document.createElement('P');
    const getData = `<span>Date : ${data.list[0].dt_txt}°C</span>`;
    createDate.innerHTML = getData;
    const createp1 = document.createElement('P');
    const tempValue = data.list[0].main.temp;
    createp1.innerHTML = `<span>Temperature : ${Math.round(tempValue)}°C</span>`
    const createp2 = document.createElement('P');
    createp2.innerHTML = `<span>Wind : ${data.list[0].weather[0].icon}</span>`;
        const weatherCondn = data.list[0].weather[0].main;
        let iconClass = "";
    if(weatherCondn === "Clouds") iconClass = "fa-cloud";
    else if(weatherCondn === "Clear") iconClass = "fa-sun";
    else if(weatherCondn === "Rain") iconClass = "fa-cloud-rain";
    const icon = document.createElement('i');
    icon.className = `fa-solid custum-style-icon ${iconClass}`;
    
    imgArea.appendChild(icon);
    const createp3 = document.createElement('P');
    createp3.innerHTML = `<span>Humidity : ${data.list[0].main.humidity}</span>`
    const forecastData = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    )

    forecastData.forEach((day)=>{
        console.log(day)
         const card = document.createElement('div');
         card.classList.add('h-36', 'bg-blue-600', 'text-white', 'p-3', 'flex-1');
         card.innerHTML = `
            <h4>${day.dt_txt.split(" ")[0]}</h4>
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${day.weather[0].main}</p>
        `;
        
        dayOne.appendChild(card);
    })
     datacontainer.innerHTML = "";
    datacontainer.append(Createh2,createp1,createp2,createp3,createDate); 
}


// render the recentcitylist
function recentCity(cityName){
        let cities = getRecentCities();
        cities = cities.filter((city)=>{
          return  city !== cityName;
        });
        cities.unshift(cityName);
        if(cities.length>5){
            cities.length = 5
        }
        setRecentCities(cities);
        renderCities();
}

// add the recent cities 
function renderCities(){
    let cities = getRecentCities();
   recentSearch.innerHTML = "";
   cities.forEach((city)=>{
        const createli = document.createElement('li');
        createli.textContent = city
        createli.classList.add("cursor-pointer", "text-blue-600");

        createli.addEventListener('click', ()=>{
            writeCity.value = city;
            findWeather()
        })
        recentSearch.appendChild(createli)
    })
}


function fetchWeather({city,lat,lon}){
    let url = "";

     if(city){
      url =    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=13a45244034e7aea0b095a02eb67254e`;
     }
     else if(lat && lon){
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=13a45244034e7aea0b095a02eb67254e`
     }

    fetch(url)
      .then((res)=>{
          if(!res.ok){
            throw new Error("City not found");
            }
            else{
                return res.json();
            }
          })
        .then((result)=> {
        setDatalocalstorage(result); 
        renderData(result);
        recentCity(result.city.name);
      
       })
     .catch((error)=>{
        showErrorApi.innerHTML = "Please Enter a valid Country name";
        const createBtn = document.createElement('button');
        createBtn.innerHTML = "ok";
        createBtn.classList.add('btn-design');
        createBtn.addEventListener('click', ()=>{
            overLay.classList.add('display_none');
            showErrorApi.innerHTML = ""; 
        })
        showErrorApi.appendChild(createBtn);
        overLay.classList.remove('display_none'); 
       
     });
    }

    function findWeather(){
    const cityName = writeCity.value;
    
     if(!cityName){
       showError.innerHTML = "Enter the Correct City name" ;
       return;
     }
     fetchWeather({city:cityName})
    }


findCitybtn.addEventListener('click', findWeather);
findbyloc.addEventListener('click', getWeatherByLocation);
document.addEventListener("DOMContentLoaded", () => {
    renderCities();
});


