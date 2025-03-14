document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const sidebar = document.getElementById('sidebar');
    const currentTime = document.getElementById('currentTime');
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const weatherInfo = document.getElementById('weatherInfo');
    const backButton = document.getElementById('backButton');

    // Открытие меню
    menuIcon.addEventListener('click', function() {
        sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
        document.getElementById("sidebar").style.display = "block";
        document.getElementById("menuIcon").style.display = "none";
    });

    // Кнопка "Назад"
    backButton.addEventListener('click', function() {
        sidebar.style.left = '-250px';
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("menuIcon").style.display = "block";
    });

    // Текущее время
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Запрос погоды
    searchButton.addEventListener('click', function() {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        const apiKey = '95e08f8571371d61194d35fe63944e8f';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Изменено на metric для Цельсия

        try {
            const response = await fetch(url);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error(error);
        }
    }

    function displayWeather(data) {
        document.getElementById("weatherInfo").style.display = "block";
        const cityName = data.name;
        const countryCode = data.sys.country;
        const temperature = data.main.temp;
        const weatherIcon = data.weather[0].icon;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        weatherInfo.innerHTML = `
            <h2>${cityName}, ${countryCode}</h2>
            <img src="${iconUrl}" alt="${weatherDescription}">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>windSpeed: ${windSpeed} m/s</p>
        `;
    }
});