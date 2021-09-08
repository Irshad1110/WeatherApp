const loc = document.getElementById("location");
const tempIcon = document.getElementById("temp-icon");
const tempValue = document.getElementById("temp-value");
const climate = document.getElementById("climate");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
})
const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1056473b8c5dbcc39d84ec846b7b3b9a`,
            { mode: 'cors' })

        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempValue.textContent = Math.round(feels_like - 273);
        if (id < 300 && id >= 200) {
            tempIcon.src = "./icons/thunderstorm.png"
        } else if (id < 400 && id >= 300) {
            tempIcon.src = "./icons/cloudy.png"
        } else if (id < 600 && id >= 500) {
            tempIcon.src = "./icons/rain.png"
        } else if (id < 700 && id >= 600) {
            tempIcon.src = "./icons/snowfall.png"
        } else if (id < 800 && id >= 700) {
            tempIcon.src = "./icons/cloudy.png"
        } else if (id == 800) {
            tempIcon.src = "./icons/sun.png"
        }
    }
    catch (err) {
        alert("city not found")
    }
};
window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        })
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1056473b8c5dbcc39d84ec846b7b3b9a`
        fetch(api).then((response) => {
            return response.json();
        })
            .then(data => {
                const { name } = data;
                const { feels_like } = data.main;
                const { id, main } = data.weather[0];
                loc.textContent = name;
                climate.textContent = main;
                tempValue.textContent = Math.round(feels_like - 273);
                if (id < 300 && id > 200) {
                    tempIcon.src = "./icons/thunderstorm.png"
                } else if (id < 400 && id > 300) {
                    tempIcon.src = "./icons/cloudy.png"
                } else if (id < 600 && id > 500) {
                    tempIcon.src = "./icons/rain.png"
                } else if (id < 700 && id > 600) {
                    tempIcon.src = "./icons/snowfall.png"
                } else if (id < 800 && id > 700) {
                    tempIcon.src = "./icons/cloudy.png"
                } else if (id == 800) {
                    tempIcon.src = "./icons/sun.png"
                }
            })
    }
})
