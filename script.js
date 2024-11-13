let api = './currency.json';

let p = new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', api, true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) resolve(xhr.responseText);
        else reject("Something went Wrong!");
    }
});

let obj = {};

p.then(function (data) {
    currencies = JSON.parse(data).rates;
    console.log(currencies);
    obj = currencies;
    dropDownSetup(currencies)

}).catch(function (err) {
    console.log(err);
})

function dropDownSetup(currencies) {
    const fromElement = document.getElementById('from-currency');
    for (const [CountryName, value] of Object.entries(currencies)) {
        let newOption = document.createElement('option');
        newOption.value = value;
        newOption.textContent = CountryName;
        fromElement.appendChild(newOption);
    }
    const toElement = document.getElementById('to-currency');
    for (const [CountryName, value] of Object.entries(currencies)) {
        let newOption = document.createElement('option');
        newOption.value = value;
        newOption.textContent = CountryName;
        toElement.appendChild(newOption);
    }

    fromElement.value = obj.USD;
    toElement.value = obj.INR;
}

let convertBtn = document.getElementById('convert');
let result = document.getElementById('result');
convertBtn.addEventListener('click', function () {

    let amount = document.getElementById('amount').value;
    let fromCurr = document.getElementById('from-currency').value;
    let toCurr = document.getElementById('to-currency').value;

    if (amount.length != 0) {
        let val = amount * (toCurr / fromCurr);
        result.innerText = val.toFixed(2);
    }
})