// automated fullfill 
let input = document.getElementById('country');
let countryAll = [{
        name: 'Poland',
        code: 'PL'
    },
    {
        name: 'Germany',
        code: 'DE'
    },
    {
        name: 'France',
        code: 'FR'
    }, {
        name: 'Spain',
        code: 'ES'
    }
];
let countryList = [];
let countryCode;
let countryResult = document.querySelector('.country_list')

// clean the list of countries
function cleanList() {
    countryResult.innerHTML = "";
    countryList = [];
}

//show list of countries
function showList() {
    for (let i = 0; i < countryList.length; i++) {
        countryResult.innerHTML += `<li class="country_item">${countryList[i]}</li>`
    }
    chooseCountry()
}

// check the value of input
function getValue() {
    cleanList()
    let currentValue = document.getElementById('country').value;
    if (currentValue.length > 0) {

        for (let i = 0; i < countryAll.length; i++) {
            if (countryAll[i].name.toLowerCase().indexOf(currentValue.toLowerCase()) != -1) {
                countryList.push(countryAll[i].name);
                countryCode = countryAll[i].code;
            }
        }
        showList()
    }
}

//choose the coutry from automated list
function chooseCountry() {
    let items = document.querySelectorAll('.country_item');
    items.forEach(item => item.addEventListener('click', function () {
        document.getElementById('country').value = item.innerHTML
        cleanList()
    }))
}

input.addEventListener('keyup', getValue)


//show the cities

let btn = document.querySelector('button')
let flag = false;

function showCities(e) {
    e.preventDefault()
    const url = `https://api.openaq.org/v1/latest?limit=10&country=${countryCode}&parameter=co&order_by=measurements.value`;
    let cityCont = document.getElementById('cities_container');

    if (flag) {
        let cityDivs = document.querySelectorAll('.city_div');
        cityDivs.forEach(city => cityCont.removeChild(city))
        flag = !flag;
    }


    fetch(url)
        .then(function (res) {
            //return console.log(res.json())
            return res.json()
        })
        .then(function (data) {
            cityCont = data.results;
            return cityCont.map(function (city) {
                let container = document.getElementById('cities_container')
                let div = document.createElement('div');
                div.classList.add('city_div');
                let span = document.createElement('span');
                span.innerHTML = `${city.city}`;
                div.appendChild(span);
                container.appendChild(div);
            })
        })
    flag = true;
}

btn.addEventListener('click', showCities)