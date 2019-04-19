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

//local storage input
if (input.value === "") {
    input.value = localStorage.getItem('inputValue')
}

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
        populateStorage()
    }))
}

input.addEventListener('keyup', getValue)

//create element & append child function

function createEl(el) {
    return document.createElement(el)
}

function append(parent, child) {
    return parent.appendChild(child)
}

//fetch 10 the most polluted cities


let search = document.querySelector('.fa-search')
let flag = false;

function showCities(e) {
    e.preventDefault()
    const url = `https://api.openaq.org/v1/latest?limit=10&country=${countryCode}&parameter=pm25&order_by=measurements[0].value&sort=desc`;
    let cityCont = document.getElementById('cities_container');

    if (flag) {
        let cityDivs = document.querySelectorAll('.city_div');
        cityDivs.forEach(city => cityCont.removeChild(city))
        flag = !flag;
    }

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            cityCont = data.results;
            return cityCont.map(function (city) {
                let container = document.getElementById('cities_container')
                //create element
                let div = createEl('div');
                let number = createEl('div')
                let numberSpan = createEl('span')
                let cityItem = createEl('div')
                let citySpan = createEl('span')
                let p = createEl('p')
                //add class
                div.classList.add('city_div');
                number.classList.add('number');
                cityItem.classList.add('city_item');
                //inner HTML
                numberSpan.innerHTML = `${city.measurements[0].value}`;
                citySpan.innerHTML = `${city.city.replace('CCAA','').replace('Com. ','').replace('Warszawa','Warsaw')}`;
                p.innerHTML = `read more +`;
                //append
                append(number, numberSpan);
                append(div, number);
                append(div, cityItem);
                append(cityItem, citySpan);
                append(cityItem, p);
                append(container, div);
                let readMore = document.querySelectorAll('p');
                readClick(readMore)
            })
        })
    flag = true;
}

search.addEventListener('click', showCities)

//add cities description from wikipedia

function showDescription() {
    const parent = this.parentNode;
    parent.querySelector('p').innerHTML = '';
    let searchTerm = parent.querySelector('span').innerHTML;
    const wiki = `http://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=&explaintext=&formatversion=2&titles=${searchTerm}`;

    fetch(wiki)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            let description = createEl('div');
            let less = createEl('p');
            less.innerHTML = 'read less -'
            description.classList.add('city_text');
            less.classList.add('less');
            append(parent, description);
            append(parent, less);
            if (data.query.pages[0].invalid || data.query.pages[0].missing || data.query.pages[0].extract == "") {
                description.innerHTML = "No information about the city"
            } else description.innerHTML = data.query.pages[0].extract;
            less.addEventListener('click', readLess)
        })
}

function readLess() {
    const parent = this.parentNode;
    let description = parent.querySelector('.city_text');
    let less = parent.querySelector('.less')
    let readMore = parent.querySelector('p');
    readMore.innerHTML = `read more +`;
    description.remove()
    less.remove()
}

function readClick(readMore) {
    readMore.forEach(function (item) {
        item.addEventListener('click', showDescription)
    })
}

///storage data
function populateStorage() {
    localStorage.setItem('inputValue', document.getElementById('country').value)
}