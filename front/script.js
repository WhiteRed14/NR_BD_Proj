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
            alert(`Zalogowano ${login}! Token zapisany.`);
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
    .then(data => displayGames(JSON.parse(data)))
    .catch(error => console.error("Błąd:", error));
}

//Wyświetlenie wyników
function displayGames(data) {
    const resultsSection = document.getElementById("response");
    resultsSection.innerHTML = ""; // Zeruje poprzednie wyniki
    //console.log(data)
    if (data.length === 0) {
        resultsSection.innerHTML = "<p>Nie znaleziono gier dla podanych kryteriów.</p>";
        return;
    }
    
    data.lista.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.className = "result-card";
        gameElement.innerHTML = `
        <h3>${game.name}</h3>
        <h4>${game.price}</h4>
        <div>
            <div>Tagi: ${game.additionalData.tags}</div>
            <div>Data wydania: ${game.additionalData.releaseDate.toString().slice(0,10)}</div>
            <div>Opis: ${game.additionalData.description}</div>
            <img src="${game.additionalData.images}" alt="${game.name}" class="element-image">
        </div>
        <button class="buy-btn" onclick="buyGame('${game._id}')" data-id="">Kup</button>
        `;
        resultsSection.appendChild(gameElement);
    });
}

function buyGame(gameId) {
    fetch("http://localhost:3000/transactions/", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            game: gameId,
            token: token
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = JSON.stringify(data, null, 2);
        
    })
    .catch(error => console.error("Błąd:", error));
}