const city = document.getElementById('input-location')
const form= document.getElementById('form-weather')
const currentWeather = document.getElementById('current-weather')
const forecast = document.getElementById('forecast')
// get coordinates from user's city 


async function getCoordinates(cityName){
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
   const response = await fetch(url)
   if (!response.ok){
    throw new Error("Failed to fetch location data")
   }
const data = await response.json();
if (!data.results || data.results.length ===0){
    throw new Error("City not found")
}

const latitude = data.results[0].latitude;
const longitude = data.results[0].longitude
return {latitude, longitude}
}
//current weather and forecast
async function getWeather(latitude,longitude){
    const url = new URL("https://api.open-meteo.com/v1/forecast")

    url.search = new URLSearchParams({
        latitude,
        longitude,
        current:"temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        temperature_unit: "fahrenheit",
        wind_speed_unit: "mph",
        precipitation_unit: "inch",
        timezone: "auto",
        forecast_days: "7"
    }).toString();
const response = await fetch(url)
if (!response.ok){
    throw new Error("unable to get weather data")
}
const data = await response.json() 
if (!data.current || !data.daily){
    throw new Error("weather data is unavailable for this location")
}
return data
}


form.addEventListener('submit', async function(event){
    event.preventDefault()

    const cityName = city.value.trim()

    if (cityName === ""){
        currentWeather.textContent = "Enter a city"
        return
    }

    currentWeather.textContent = "Loading..."
    forecast.innerHTML = ""

    try {
        const coordinates = await getCoordinates(cityName)
        const weather = await getWeather(coordinates.latitude, coordinates.longitude)

        const current = weather.current
        const daily = weather.daily

        currentWeather.innerHTML = `
            <h2>Current Weather</h2>
            <p>Temperature: ${current.temperature_2m}°F</p>
            <p>Feels like: ${current.apparent_temperature}°F</p>
            <p>Humidity: ${current.relative_humidity_2m}%</p>
            <p>Wind: ${current.wind_speed_10m} mph</p>
        `

        forecast.innerHTML = "<h2>7 Day Forecast</h2>"

        for (let i = 0; i < daily.time.length; i++){
            forecast.innerHTML += `
                <div class="forecast-day">
                    <h3>${daily.time[i]}</h3>
                    <p>High: ${daily.temperature_2m_max[i]}°F</p>
                    <p>Low: ${daily.temperature_2m_min[i]}°F</p>
                    <p>Rain: ${daily.precipitation_probability_max[i]}%</p>
                </div>
            `
        }

    } catch(error){
        currentWeather.textContent = error.message
    }
})
