function loginSender() {
    const userLogin = document.getElementById("loginLogin").value;
    const userPassword = document.getElementById("loginPassword").value;

    const data_login = {
        user_login: userLogin,
        user_password: userPassword
    };

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data_login)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(alert("You succesful logined!"))
    .catch(error => console.error("Ошибка:", error));
}

function registerSender() {
    const userLogin = document.getElementById("registerLogin").value;
    const userEmail = document.getElementById("registerEmail").value;
    const userPassword = document.getElementById("registerPassword").value;

    const data_register = {
        user_login: userLogin,
        user_email: userEmail,
        user_password: userPassword
    };

    fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data_register)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(alert("You succesful registered!"))
    .catch(error => console.error("Ошибка:", error));
}