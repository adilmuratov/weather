function CurrentTime() {
    let now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
}

CurrentTime();
setInterval(CurrentTime, 1000);

const API_KEY = "95e08f8571371d61194d35fe63944e8f";


async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("error");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const country = data.sys.country;
            const temperature = data.main.temp;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const description = data.weather[0].description
            const timestamp = data.dt * 1000;
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString("en-GB", {
                month: "long",
                day: "numeric"
            })

            document.getElementById("iconTemp").style.display = "block";
            document.getElementById("date").textContent = `${formattedDate}`;
            document.getElementById("city_name").textContent = `${data.name}, ${country}`;
            document.getElementById("temp").textContent = `${temperature}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
            document.getElementById("wind").textContent =  `Wind speed: ${windSpeed} m/s`;
            document.getElementById("weather").textContent = `${description}`;
            document.getElementById("icon").src = iconUrl;
            document.getElementById("icon").style.filter = "brightness(2)";
        } else {
            console.log("Ошибка:", data.message);
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
}

document.getElementById("btn").addEventListener("click", getWeather);

document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});