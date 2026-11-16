# Daily Weather App

## About the Project

 The app allows users to search for a city and view the current weather and a 7-day forecast.

## Features

- Search for weather by city name
- View the current temperature and feels-like temperature
- View humidity and wind speed
- View a 7-day forecast with high and low temperatures
- View the chance of rain for each day
- Display an error message if a city cannot be found

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API
- Open-Meteo API

## APIs Used

I used two Open-Meteo API endpoints:

1. **Geocoding API:** Gets the latitude and longitude based on the city entered by the user.
2. **Forecast API:** Uses those coordinates to get current weather information and a 7-day forecast.

API documentation: https://open-meteo.com/

## How to Run the Project

1. Download or clone this repository from GitHub.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser or use the Live Server extension.
4. Enter a city name in the search box.
5. Click the Search button.
6. The current weather and 7-day forecast will appear.

No API key is needed.

## Project Files

- `index.html` - Contains the structure of the webpage.
- `css/style.css` - Contains the styling for the webpage.
- `js/index.js` - Contains the JavaScript for getting and displaying weather data.
- `README.md` - Contains information and instructions about the project.

## Error Handling

The app displays an error message if a city cannot be found or if weather data is unavailable.

## What I Learned

This project helped me practice using JavaScript to work with APIs. I learned more about using fetch, async/await, handling errors, and displaying API data on a webpage.
