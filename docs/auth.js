function loginSender() {
    const userLogin = document.getElementById("loginLogin").value;
    const userPassword = document.getElementById("loginPassword").value;

    if (userLogin === "" || userPassword === "") {
        return alert("Fill in the values");
    };

    const data_login = {
        user_login: userLogin,
        user_password: userPassword
    };

    async function checkData() {
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data_login)
            });
            const data = await response.json();
            
            if (!data.userPresence) {
                alert("User not founded!");
            } else if (data.passwordCorrect) {
                alert("You succesful logined!");
                window.location.href = "http://127.0.0.1:5500/docs/index.html";
            } else {
                alert("You not succesful logined, check your password!");
            };

            console.log("Back data:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    checkData();
}

function registerSender() {
    const userLogin = document.getElementById("registerLogin").value;
    const userEmail = document.getElementById("registerEmail").value;
    const userPassword = document.getElementById("registerPassword").value;

    if (userLogin === "" || userEmail === "" || userPassword === "") {
        return alert("Fill in the values");
    };

    const data_register = {
        user_login: userLogin,
        user_email: userEmail,
        user_password: userPassword
    };

    async function sendData() {
        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data_register)
            });
            const data = await response.json();
            if (data.rowCount === 1) {
                return alert("User already exist");
            };
            window.location.href = "http://127.0.0.1:5500/docs/index.html";
            alert("You succesful registered!");
            console.log("Back data:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    sendData();
}

function logoutSender() {
    const data_logout = {
        logoutInfo: true
    };
    async function logout() {
        try {
            const response = await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data_logout)
            });
            const data = await response.json();
            if (data.succes) {
                alert("You succesful logouted!");
                console.log(data);
            } else {
                alert("You not succesful logouted!");
            }
        } catch(error) {
            console.error("Error:", error);
        }
    }
    logout();
}