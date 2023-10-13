let selectCountry = document.getElementById("chooseCountry")
let selectSubRegion = document.getElementById("chooseSubRegion")

let finishRegion = document.getElementById("chooseRegion")
finishRegion.addEventListener("change", chosenRegion => {
    selectedRegion = chosenRegion.target.value
    loadSubregions(selectedRegion)
})


let finishSubRegion = document.getElementById("chooseSubRegion")
finishSubRegion.addEventListener("change", chosenSubRegion => {
    selectedSubRegion = chosenSubRegion.target.value
    console.log(selectedSubRegion)
    loadCountries(selectedSubRegion)

})

let finishCountry = document.getElementById("second-search-button")
finishCountry.addEventListener("click",getUserCountry)


function loadRegions() {
    createPlaceholder(chooseRegion)
    createPlaceholder(chooseSubRegion)
    createPlaceholder(chooseCountry)
    fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => (response.json()))
        .then((data) => {
            let regionList = []
            data.forEach(countryNameRegion => {
                let region = countryNameRegion.region

                if (!regionList.includes(region)) {
                    regionList.push(region)
                }
            })
            console.log(regionList)

            let selectRegion = document.getElementById("chooseRegion")
            regionList.forEach((chooseRegion) => {

                let createRegion = document.createElement("option")
                createRegion.textContent = chooseRegion
                selectRegion.appendChild(createRegion)
            })
        })
        .catch((err) => console.log(err));
}


chooseRegion = document.getElementById("chooseRegion")
chooseRegion.addEventListener("change", regionUrl => {
    let selectedRegion = chooseRegion.value
    console.log(selectedRegion)
    removeChildren(selectCountry)
    createPlaceholder(chooseCountry)
})




function loadSubregions(selectedRegion) {

    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((response) => (response.json()))
        .then((data) => {

            let subregionList = []
            data.forEach(countryNameSubregion => {
                let subregion = countryNameSubregion.subregion

                if (subregion != undefined) {
                    if (!subregionList.includes(subregion)) {
                        subregionList.push(subregion)
                    }
                }

            })

            console.log(subregionList)

            removeChildren(selectSubRegion)
            createPlaceholder(chooseSubRegion)

            subregionList.forEach((chooseSubRegion) => {

                let createSubRegion = document.createElement("option")
                if (createSubRegion == undefined) {
                    console.log("error creating option ")
                }

                createSubRegion.textContent = chooseSubRegion

                selectSubRegion.appendChild(createSubRegion)
            })
        })
        .catch((err) => console.log(err));
}

function loadCountries(selectedSubRegion) {

    fetch(`https://restcountries.com/v3.1/subregion/${selectedSubRegion}`)
        .then((response) => (response.json()))
        .then((data) => {
            let countryList = []
            data.forEach(countryName => {
                let country = countryName.name.common
                if (!countryList.includes(country)) {
                    countryList.push(country)
                }
            })
            console.log(countryList)


            removeChildren(selectCountry)
            createPlaceholder(chooseCountry)

            countryList.forEach((chooseCountry) => {

                let createCountry = document.createElement("option")
                createCountry.textContent = chooseCountry
                selectCountry.appendChild(createCountry)
            })
        })
        .catch((err) => console.log(err));
}


function removeChildren(selectOption) {
    while (selectOption.firstChild) {
        selectOption.removeChild(selectOption.firstChild)
    }
}


function createPlaceholder(chosenSelection) {
    let shortenChosenSelection = chosenSelection.id.substring(6)
    let placeholder = document.createElement("option")
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.textContent = shortenChosenSelection
    chosenSelection.appendChild(placeholder)
}

function getUserCountry() {
    let selectedCountry = selectCountry.value
    console.log(selectedCountry)
    fetch(`https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`)
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((country)=>{            
            setCountryOnWebsite(country)
        })
    })
}

function setCountryOnWebsite(country) {
    let countryInfo = document.getElementById("countryInfo")
    while(countryInfo.hasChildNodes()){
        countryInfo.removeChild(countryInfo.firstChild)
    }

    let countryFlag = document.createElement("img")
    countryFlag.src=country.flags.png
    countryInfo.appendChild(countryFlag)

    let countryName = document.createElement("h3")
    countryName.textContent = `${country.name.common}`
    countryInfo.appendChild(countryName)

    let countryInfoList = document.createElement("ul")

    let countryCapitalLi = document.createElement("li")
    countryCapitalLi.textContent = `Capital: ${country.capital}`
    countryInfoList.appendChild(countryCapitalLi)

    let countryLanguagesLi = document.createElement("li")
    let firstLanguage = Object.keys(country.languages)[0]
    countryLanguagesLi.textContent = `Languages: ${country.languages[firstLanguage]}`
    countryInfoList.appendChild(countryLanguagesLi)

    let countryTimezonesLi = document.createElement("li")
    countryTimezonesLi.textContent = `Timezones: ${country.timezones}`
    countryInfoList.appendChild(countryTimezonesLi)

    let countryMapsLi = document.createElement("li")
    let countryMapsRef = document.createElement("a")
    countryMapsRef.href = `${country.maps.googleMaps}`
    countryMapsRef.textContent = "Check out on maps!"

    countryMapsLi.appendChild(countryMapsRef)

    countryInfoList.appendChild(countryMapsLi)

    countryInfo.appendChild(countryInfoList)
}

function randomizeCountries(){
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response=>response.json())
    .then((data)=>{
        randomNumber = parseInt(Math.random()*data.length) 
        console.log(randomNumber)
        let randomCountry = data[randomNumber]
        setCountryOnWebsite(randomCountry)
    })
}
randomizeCountries()

// function randomCountry() {
    // fetch("https://restcountries.com/v3.1/all")//   `https://restcountries.com/v3.1/subregion/${selectedSubregion}`
    //     .then((response) => (response.json()))
    //     .then((data) => {

    //         console.log(data[0]);

    //         let randomCountry = data[Math.floor(Math.random() * data.length)]

    //         let divSelectedCountry = document.getElementById("countryInfo");

    //         divSelectedCountry.appendChild(createSelectedCountrysDiv(randomCountry))



    //     })
// }



// function createSelectedCountrysDiv(selectedCountry) {
//     let countryDiv = document.createElement("div")
//     let countryName = document.createElement("h3")
//     let countryFlag = document.createElement("img")

//     countryName.textContent = selectedCountry.name.common
//     countryFlag.src = selectedCountry.flags.png
//     countryFlag.alt = selectedCountry.name

//     countryDiv.appendChild(countryFlag);
//     countryDiv.appendChild(countryName);


//     return countryDiv;

// }

// randomCountry();

loadRegions()


