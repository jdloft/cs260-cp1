var currencies = getCurrencies();
var id = "bitcoin";
updateCardano();
getCurrency(id);

async function getCurrencies() {
    const url = "http://api.coingecko.com/api/v3/coins/list";
    currencies = await fetch(url).then(response => response.json());
}

function updateCardano() {
    const url = "http://api.coingecko.com/api/v3/coins/cardano";
    fetch(url).then(response => response.json()).then(data => {
        document.getElementById("cardano-name").innerHTML = data.name;
        document.getElementById("cardano-price").innerHTML = "$" + data.market_data.current_price.usd;
        document.getElementById("cardano-market-cap").innerHTML = "$" + data.market_data.market_cap.usd;
        document.getElementById("cardano-volume").innerHTML = "$" + data.market_data.total_volume.usd;
        document.getElementById("cardano-supply").innerHTML = data.market_data.circulating_supply + " " + data.symbol;
    });
}

function setId(inputId) {
    id = inputId;
    getCurrency();
}

function getCurrency() {
    const url = "http://api.coingecko.com/api/v3/coins/" + id;
    fetch(url).then(response => response.json()).then(data => {
        document.getElementById("other-name").innerHTML = data.name;
        document.getElementById("other-ticker").innerHTML = data.symbol;
        document.getElementById("other-price").innerHTML = "$" + data.market_data.current_price.usd;
        document.getElementById("other-market-cap").innerHTML = "$" + data.market_data.market_cap.usd;
        document.getElementById("other-volume").innerHTML = "$" + data.market_data.total_volume.usd;
        document.getElementById("other-supply").innerHTML = data.market_data.circulating_supply + " " + data.symbol;
    });
}

document.getElementById("currencyInput").addEventListener("keyup", function (event) {
    event.preventDefault();
    var everything;
    everything = "<ul>";
    for (let i = 0; i < currencies.length; i++) {
        if (currencies[i].name.toLowerCase().startsWith(document.getElementById("currencyInput").value.toLowerCase())) {
            everything += "<li><a href=\"#\" onclick=\"setId('" + currencies[i].id + "');return false;\">" + currencies[i].name + "</a></li>";
        }
    };
    everything += "</ul>";
    document.getElementById("currencyHint").innerHTML = everything;
});

function update() {
    updateCardano();
    getCurrency();
}
window.setInterval(function(){
    update();
}, 3*1000);
