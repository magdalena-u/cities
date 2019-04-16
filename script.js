// automated fullfill 
let input = document.getElementById('country');
let countryAll = ['Poland', 'Germany', 'France', 'Spain'];
let countryList = [];
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
            if (countryAll[i].toLowerCase().indexOf(currentValue.toLowerCase()) != -1) {
                countryList.push(countryAll[i])
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