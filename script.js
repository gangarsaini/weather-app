//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
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
const imgChange = document.querySelector('#img-change');

let currentTemp = false;
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

  if (!navigator.geolocation){
       return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
                fetchWeather({
                  lat : position.coords.latitude,
                  lon : position.coords.longitude
                });
     },
    (error) => {
      ErrorHandle("Location access denied. Please allow location access.");
    }
  );
}

const tempAlert = document.createElement('p');
tempAlert.innerHTML = "⚠️ City is very hot! Temperature is above 40°C";
tempAlert.classList.add('fixed-in-top');
tempAlert.style.display = "none"
document.body.appendChild(tempAlert);
// render the View
function renderData(data){
    datacontainer.innerHTML  = ''
    dayOne.innerHTML = "";
    imgArea.innerHTML = ''
    const Createh2 = document.createElement('H2');
    Createh2.innerHTML = data.city.name;
    Createh2.classList.add('font-bold','text-xl');
    const createDate = document.createElement('span');
    const getData = ` (${data.list[0].dt_txt.split(" ")[0]})`;
    createDate.innerHTML = getData;
    Createh2.appendChild(createDate);
    const createp1 = document.createElement('P');
    const tempValue = data.list[0].main.temp;
    const TempInDegree = Math.round(tempValue);
    // temperature more than 40 condition
  
     if(TempInDegree>40){
      tempAlert.style.display = "block"
      }
      else{
        tempAlert.style.display = "none"
      }

    //Creating toggle btn
    const StoreTemp = Math.round(Math.round(tempValue)*9/5)+32
    createp1.innerHTML = `<div>
        Temperature : <span class="temp-value">${TempInDegree}°C</span> 
        <span class="toggle-btn">
          <span class="circle"></span>
        </span> 
    </div>`
    
    const getTempratureValue = createp1.querySelector('.temp-value');
    const toggleBtn = createp1.querySelector('.toggle-btn');
    // creating toggle to change Temprature
    toggleBtn.addEventListener('click', ()=>{
      currentTemp = !currentTemp
      toggleBtn.classList.toggle('on');
      if(currentTemp){
        getTempratureValue.innerText =  `${StoreTemp} °F`;
     }
     else{
       getTempratureValue.innerText =  `${TempInDegree} °C`;
     }
        
      
 })
 
    const createp2 = document.createElement('P');
    createp2.innerHTML = `<div>Wind : ${data.list[0].wind.speed} M/S</div>`;
        const weatherCondn = data.list[0].weather[0].main;
      const CreateH2 = document.createElement('h2');
      CreateH2.innerHTML = data.list[0].weather[0].main;
      if(weatherCondn === "Clouds"){
      imgChange.classList.add('clouds');
    }
    else{
      imgChange.classList.remove('clouds');
    }
    if(weatherCondn === "Clear"){
      imgChange.classList.add('clear');
    }
    else{
      imgChange.classList.remove('clear');
    }
        if(weatherCondn === "Rain"){
      imgChange.classList.add('rain');
    }
    else{
      imgChange.classList.remove('rain');
    }
    let iconClass = "";
    if(weatherCondn === "Clouds") iconClass = "fa-cloud";
    else if(weatherCondn === "Clear") iconClass = "fa-sun";
    else if(weatherCondn === "Rain") iconClass = "fa-cloud-rain";
    const icon = document.createElement('i');
    icon.className = `fa-solid custum-style-icon ${iconClass}`;
    imgArea.append(icon,CreateH2);
    const createp3 = document.createElement('P');
    createp3.innerHTML = `<div>Humidity : ${data.list[0].main.humidity}%</div>`
    // five days forecasting
    const forecastData = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    )
    forecastData.forEach((day)=>{
        console.log(day,"what in it")
         const card = document.createElement('div');
         card.classList.add('design-forecate-parent');
         const forecastWeathericon = day.weather[0].main;
          if(forecastWeathericon === "Clouds") iconClass = "fa-cloud";
          else if(forecastWeathericon === "Clear") iconClass = "fa-sun";
          else if(forecastWeathericon === "Rain") iconClass = "fa-cloud-rain";
          const weatherIconWapper = document.createElement('P');
          const weatherIcon = document.createElement('i');
          weatherIconWapper.appendChild(weatherIcon);
          weatherIcon.className = `fa-solid custum-style-icon ${iconClass}`
          const forecastdataP1 = document.createElement('p');
          forecastdataP1.innerHTML = day.dt_txt.split(" ")[0]
          const forecastdataP2 = document.createElement('p');
          forecastdataP2.innerHTML = `Temp : ${Math.round(day.main.temp)}°C`;
          const forecastdataP3 = document.createElement('p');
         // const Convertwind = day.wind.speed*3.6
          forecastdataP3.innerHTML = `Wind : ${day.wind.speed} M/S`;
          const forecastdataP4 = document.createElement('p');
          forecastdataP4.innerHTML = `Humidity : ${day.main.humidity}%`;
          card.append(forecastdataP1,forecastdataP2,weatherIconWapper,forecastdataP3,forecastdataP4)
          dayOne.appendChild(card);
    })
     datacontainer.innerHTML = "";
    datacontainer.append(Createh2,createp1,createp2,createp3); 
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
        const createli = document.createElement('option');
        createli.innerHTML = city
        createli.classList.add("cursor-pointer", "text-blue-600");
        recentSearch.appendChild(createli)
   })
}
recentSearch.addEventListener('change', (e)=>{
          const getOnChangeValue = e.target.value;
          console.log(getOnChangeValue);
           
            writeCity.value = getOnChangeValue;
            findWeather()
        })

//Error Handling Function
function ErrorHandle(message){
   if (!overLay.classList.contains('display_none')) return;
   showErrorApi.innerHTML = message;
   const createBtn = document.createElement('button');
    createBtn.innerHTML = "ok";
    createBtn.classList.add('btn-design');
    createBtn.addEventListener('click', ()=>{
            overLay.classList.add('display_none');
            showErrorApi.innerHTML = ""; 
           
    })
    showErrorApi.appendChild(createBtn);
    overLay.classList.remove('display_none'); 
}
// calling api for both situation
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
          console.log(result)
        setDatalocalstorage(result); 
        renderData(result);
        recentCity(result.city.name);
      
       })
     .catch((error)=>{
        const msg = "Please Enter the valid City name"
        ErrorHandle(msg)
       
     });
    }


    function findWeather(){
    const cityName = writeCity.value;
    
     if(!cityName){
        const msg = "Please, Enter the City Name First or Search by Location";
        ErrorHandle(msg);
       return;
     }
     fetchWeather({city:cityName})
    }


findCitybtn.addEventListener('click', ()=>{
  overLay.classList.add('display_none');
  showErrorApi.innerHTML = "";
  findWeather();
});
findbyloc.addEventListener('click', ()=>{
  overLay.classList.add('display_none');
  showErrorApi.innerHTML = "";
  getWeatherByLocation()
});
document.addEventListener("DOMContentLoaded", () => {
    renderCities();
     const lastData = getDatalocalstorage();
     if (lastData && lastData.city) {
    renderData(lastData);
  }
});




