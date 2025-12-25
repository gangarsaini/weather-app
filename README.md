🌦️ Weather Application

This is a responsive Weather Application built using HTML, CSS (Tailwind) and Vanilla JavaScript, which fetches real-time weather data from the OpenWeather API.
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

git clone, https://github.com/gangarsaini/weather-app.git


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