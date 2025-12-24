<!-- Weather Application, I am expalining how, I have created this application

Firstly one first, i have created basic html after I desgin that, 

in Second day, I had logged in to openWeatherApi webiste. 
after that i have done some R And D on the APIs

I serached one api for my application


get the input city and button fields in script file by querySelector then and call the api, 
after two three affects it was working and having data.I have used fetch here to call API.
I have created localStorage function for setItem and getItem. 
I linked my project github and push my code there.

below is my github link:


In the third day, I started to call data from the api of Enter city, for that i have created a
function (fetchWeather({city,lat,lon})) to call the Api and set the fetched data into the localStorage.
and a function that i have created for renderdata(), i am setting that result form api into this function.

Another function (findWeather) for the enter the city value if it is not present the show Error.
 if it is present call (fetchWeather()).

 Now, on serach button call the addEventListener on click, calling the findWeather() and 
 on another location button call the another addEventListener on click, calling the  getWeatherByLocation()

 I have created a function for the to Show the Error ErrorHandle()

 I have created a function recentCity() to show Recent-search Country. for this, 
 I have created a seperate localStorage function and store the adds Country into it.

 in recentCity I put the codition, like city name should come again, city 
 sholud 5 only and lastest country should come above.

 then created a render function to show the Country in dropdown. option of select is created dynamic.

here I am Showing data by renderData having multiple condition like temperature will come in degree
image and icon come dynamically,

toggle button will come and show the temperature in °C and °f; 
I have stored that in variable and call it on condition by using a flag(currentTemp);

I am changing background acc to the clouds and icon.

I am also render the recent-search city data by DOMContentLoaded function

After that i have the color theme and try to design it as professionally and make it responsive also. -->





🌦️ Weather Application

A responsive Weather Application built using HTML, CSS (Tailwind) and Vanilla JavaScript, which fetches real-time weather data from the OpenWeather API.
The app allows users to search weather details by city name or current location and stores recent searches using localStorage.

🔗 Live Demo / GitHub

👉 GitHub Repository:
     https://github.com/gangarsaini/weather-app

🛠️ Technologies Used

HTML5

CSS3 (Tailwind CSS)

JavaScript (ES6)

OpenWeather API

Browser LocalStorage

Font Awesome Icons

✨ Features

🌍 Search weather by city name

📍 Get weather using current location (Geolocation API)

🔁 Recent search history (up to 5 cities)

🌡️ Temperature toggle (°C ⇄ °F)

⛅ Dynamic weather icons & background changes

📆 5-day weather forecast

⚠️ Error handling for invalid city names & location access

💾 Data persistence using localStorage

📱 Fully responsive design

📅 Development Journey (Day-wise Explanation)
🟢 Day 1 – UI & Basic Setup

Created the basic HTML structure

Designed the UI using Tailwind CSS

Made the layout responsive for mobile and desktop

🟢 Day 2 – API Research & Integration

Signed up on the OpenWeather API website

Researched available APIs and selected the 5-day forecast API

Used fetch() to call the API

Successfully received and logged weather data

Created helper functions for:

setItem and getItem using localStorage

Initialized the GitHub repository and pushed the initial code

🟢 Day 3 – Weather Search & Rendering

Implemented city-based weather search

Created fetchWeather({ city, lat, lon }) function to:

Fetch weather data

Store API response in localStorage

Created renderData() function to display:

City name

Temperature

Wind speed

Humidity

Weather condition

Implemented findWeather() to:

Validate input

Show error if city name is empty

Added event listeners for:

Search button (city-based)

Location button (geolocation-based)

Implemented centralized error handling using ErrorHandle()

🟢 Day 4 – Recent Search & UI Logic

Created recentCity() function to manage recent searches

Stored recent cities in localStorage

Added logic:

No duplicate cities

Maximum of 5 cities

Latest search appears on top

Rendered recent cities dynamically inside a dropdown <select>

Added DOMContentLoaded to load:

Recent cities

Last searched weather data

🟢 Day 5 – Advanced Features & UI Polish

Added temperature toggle between °C and °F using a flag variable

Displayed alert when temperature exceeds 40°C

Implemented dynamic background and icons based on weather conditions

Rendered 5-day forecast cards dynamically

Improved UI colors and overall professional look

Tested responsiveness across devices

⚙️ How to Run the Project Locally

Clone the repository:

git clone <your-repo-url>


Open index.html in your browser

Add your OpenWeather API key in the JavaScript file:

const ApiToken = "YOUR_API_KEY";


⚠️ Note: API keys should be stored in environment variables in production.

📌 Folder Structure (Example)
/weather-app
│── index.html
│── style.css
│── script.js
│── README.md

🚀 Learnings from This Project

API integration using fetch

Working with asynchronous JavaScript

DOM manipulation

LocalStorage usage

Error handling and user feedback

UI state management using flags

Responsive design principles

Real-world frontend problem solving






 I 






