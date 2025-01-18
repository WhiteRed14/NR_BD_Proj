let token = ""; 

function registerUser() {
    const login = document.getElementById("registerLogin").value;
    const password = document.getElementById("registerPassword").value;

    fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: login, password: password })
    })
    .then(response => response.text())
    .then(data => document.getElementById("response").innerText = data)
    .catch(error => console.error("Błąd:", error));
}

function loginUser() {
    const login = document.getElementById("loginLogin").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: login, password: password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = JSON.stringify(data, null, 2);
        if (data.token) {
            token = data.token;
            alert("Zalogowano! Token zapisany.");
        }
    })
    .catch(error => console.error("Błąd:", error));
}

function addGame() {
    const name = document.getElementById("gameName").value;
    const price = document.getElementById("gamePrice").value;
    const tags = document.getElementById("gameTags").value.split(",");

    fetch("http://localhost:3000/games", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ name: name, price: price, additionalData: { tags: tags } })
    })
    .then(response => response.text())
    .then(data => document.getElementById("response").innerText = data)
    .catch(error => console.error("Błąd:", error));
}

function fetchGames() {
    fetch("http://localhost:3000/games")
    .then(response => response.text())
    .then(data => document.getElementById("response").innerText = data)
    .catch(error => console.error("Błąd:", error));
}
