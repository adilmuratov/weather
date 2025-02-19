function CurrentTime() {
    let now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
}

CurrentTime();
setInterval(CurrentTime, 1000);

const apiKey = "95e08f8571371d61194d35fe63944e8f";
const API_KEY = "95e08f8571371d61194d35fe63944e8f";
const city = "moscow";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log(`Город: ${data.name}`);
            console.log(`Температура: ${data.main.temp}°C`);
            console.log(`Погода: ${data.weather[0].description}`);
        } else {
            console.log("Ошибка:", data.message);
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
}

getWeather();

