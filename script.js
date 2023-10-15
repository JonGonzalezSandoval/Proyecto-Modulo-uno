let finishRegion = document.getElementById("chooseRegion")
let selectSubregion = document.getElementById("chooseSubRegion")
let selectCountry = document.getElementById("chooseCountry")
let finishCountry = document.getElementById("second-search-button")


function loadRegions() {
    createPlaceholder(finishRegion)
    createPlaceholder(selectSubregion)
    createPlaceholder(selectCountry)
    fetch(`https://restcountries.com/v3.1/all`)
    .then((response) => (response.json()))
    .then((data) => {

            let back = checkIfRegionStoraged();

            let regionList = []
            data.forEach(countryNameRegion => {
                let region = countryNameRegion.region
                
                if (!regionList.includes(region)) {
                    regionList.push(region)
                }
            })
            // console.log(regionList)

            let selectRegion = document.getElementById("chooseRegion")
            regionList.forEach((chooseRegion) => {

                let createRegion = document.createElement("option")
                createRegion.textContent = chooseRegion
                if (chooseRegion === back) {
                    createRegion.selected = true
                }

                selectRegion.appendChild(createRegion)
            })

            if (back !== "") {
                loadSubregions(back)
            }


        })
        .catch((err) => alert ("No se pudo cargar esta página region"));
}


function loadSubregions(selectedRegion) {
    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
    .then((response) => (response.json()))
    .then((data) => {
        if(selectedRegion !== "Antarctic"){
            let subregionList = []
            data.forEach(countryNameSubregion => {
                let subregion = countryNameSubregion.subregion
                
                if (subregion != undefined) {
                    if (!subregionList.includes(subregion)) {
                        subregionList.push(subregion)
                    }
                }
                
            })
            
            // console.log(subregionList)
            
            removeChildren(selectSubregion)
            createPlaceholder(selectSubregion)

            
            
            subregionList.forEach((chooseSubregion) => {
                
                let createSubregion = document.createElement("option")
                if (createSubregion == undefined) {
                    console.log("error creating option ")
                }
                
                createSubregion.textContent = chooseSubregion
                
                selectSubregion.appendChild(createSubregion)
            })

            selectSubregion.disabled = false;
            finishCountry.disabled = true;
        }else{
            let createdSubregion = document.createElement("option")
            createdSubregion.selected = true;
            createdSubregion.textContent = selectedRegion;
            selectSubregion.appendChild(createdSubregion);
            fillCountrySelect(data)
            selectSubregion.disabled = true;

        }
    })
    .catch((err) => alert ("No se pudo cargar esta página subregion" + err));
    
}
    
    
function loadCountries(selectedSubregion) {
    
    fetch(`https://restcountries.com/v3.1/subregion/${selectedSubregion}`)
    .then((response) => (response.json()))
    .then((data) => {
        fillCountrySelect(data);



    })
    .catch((err) => alert ("No se pudo cargar esta página pais"));
}


function fillCountrySelect(data){
    let countryList = []
    data.forEach(countryName => {
        let country = countryName.name.common
        if (!countryList.includes(country)) {
            countryList.push(country)
        }
    })
    // console.log(countryList)
    
    
    removeChildren(selectCountry)
    createPlaceholder(chooseCountry)
    
    countryList.forEach((chooseCountry) => {
        if(chooseCountry !== "Antarctica"){
            let createCountry = document.createElement("option")
            createCountry.textContent = chooseCountry
            selectCountry.appendChild(createCountry)
        }
    })

    selectCountry.disabled = false;
}
    
    
function removeChildren(selectOption) {
    while (selectOption.firstChild) {
        selectOption.removeChild(selectOption.firstChild)
    }
}
    
    
function createPlaceholder(chosenSelection) {
    // console.log(chosenSelection)
    let shortenChosenSelection = chosenSelection.name;
    // console.log(shortenChosenSelection)
    
    let placeholder = document.createElement("option")
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.textContent = shortenChosenSelection
    chosenSelection.appendChild(placeholder)
}
    
    
function getUserCountry() {
    let selectedCountry = selectCountry.value
    // console.log(selectedCountry)
    fetch(`https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`)
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach((country)=>{            
            setCountryOnWebsite(country)
        })
    })
    .catch((err) => alert ("No se pudo cargar esta página pais escogido"));
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
    countryMapsRef.target = "_blank"

/*------------------------------------------------------*/
    let favButton = document.createElement("button");
    favButton.id = country.name.common;
    if(localStorage.getItem("favCountries") && JSON.parse(localStorage.getItem("favCountries")).includes(country.name.common)){
        // if(JSON.parse(localStorage.getItem("favCountries")).includes(country.name.common)){
            favButton.textContent = "Eliminar favorito";
        // }
    }else{
        favButton.textContent = "Añadir favorito";
    }
    // console.log(country.name.common);
    
    /*------------------------------------------------------*/
    
    countryMapsLi.appendChild(countryMapsRef)
    
    countryInfoList.appendChild(countryMapsLi)
    
    countryInfo.appendChild(countryInfoList)

    /*------------------------------------------------------*/
    countryInfo.appendChild(favButton)

    // console.log(document.querySelector(`#${country.name.common}`));

    document.getElementById(`${country.name.common}`).addEventListener("click", function(){
        this.textContent = addFavCountryList(this.id)
    });
    /*------------------------------------------------------*/
}


function randomizedCountrie(){
    fetch(`https://restcountries.com/v3.1/all`)
    .then(response=>response.json())
    .then((data)=>{
        randomNumber = parseInt(Math.random()*data.length) 
        console.log(randomNumber)
        let randomCountry = data[randomNumber]
        setCountryOnWebsite(randomCountry)
    })
    .catch((err) => alert ("No se pudo cargar esta página Pais Aleatorio"));
}



function checkIfRegionStoraged(){
    if(localStorage.getItem("preSelectedRegion")){
        let retractedFromLS = JSON.parse(localStorage.getItem("preSelectedRegion"));
        localStorage.removeItem("preSelectedRegion")
        return retractedFromLS;
    }
    return "";
}


finishRegion.addEventListener("change", chosenRegion => {
    selectedRegion = chosenRegion.target.value
    selectCountry.disabled = true;
    finishCountry.disabled = true;
    removeChildren(selectCountry)
    createPlaceholder(chooseCountry)
    loadSubregions(selectedRegion)
})


selectSubregion.addEventListener("change", chosenSubregion => {
    selectedSubregion = chosenSubregion.target.value
    // console.log(selectedSubregion)
    loadCountries(selectedSubregion)
    
})

selectCountry.addEventListener("change", () => finishCountry.disabled = false)


finishCountry.addEventListener("click", ()=>{
    loadingIlusion(getUserCountry)
});


// randomizedCountrie()
loadingIlusion(randomizedCountrie);

checkLS();

loadRegions()



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
        
    function addFavCountryList(selectedId){
        let favArray = [];
        let returnMessage = "";

        if(localStorage.getItem("favCountries")){
            favArray = JSON.parse(localStorage.getItem("favCountries"));
        }


        // console.log(selectedId);


        if (favArray.includes(selectedId)) {
            favArray = favArray.filter(country => country !== selectedId)
            deleteFavCountryListDOM(selectedId)
            returnMessage = "Añadir favorito"
        }else{
            favArray.push(selectedId);
            addFavCountryListDOM(selectedId);
            returnMessage = "Eliminar favorito"
        }


        localStorage.setItem("favCountries", JSON.stringify(favArray));
        return returnMessage;

    }

    function addFavCountryListDOM(country){

        let favoriteListDOM = document.getElementById("favCountry");
        let newCountry = document.createElement("li");
        newCountry.id = country + "Fav";
        newCountry.textContent = country;


        favoriteListDOM.appendChild(newCountry);

        document.getElementById(country + "Fav").addEventListener("click", function(){
            favoritedSelectedCountry(country)
        })
        

    }


    function deleteFavCountryListDOM(country){
        // let favoriteListDOM = document.getElementById("favCountry");
        let removeLi = document.getElementById(country+"Fav")
        
        removeLi.remove();

        // favoriteListDOM.removeChild(document.getElementById(country))
    }

    function checkLS(){
        let favArray = [];

        if(localStorage.getItem("favCountries")){
            favArray = JSON.parse(localStorage.getItem("favCountries"));
        }

        favArray.map(favCountry => addFavCountryListDOM(favCountry))
    }


    function favoritedSelectedCountry(selectedCountry){
        fetch(`https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`)
        .then((response)=>response.json())
        .then((data)=>{
            data.forEach((country)=>{            
                setCountryOnWebsite(country)
            })
        })
        .catch((err) => alert ("No se pudo cargar esta página Pais Favorito Seleccionado"));
    }




    function loadingIlusion(nextFunction){
        let countryInfo = document.getElementById("countryInfo")
        while(countryInfo.hasChildNodes()){
            countryInfo.removeChild(countryInfo.firstChild)
        }

        let wholeContainerDiv = document.createElement("div")
        wholeContainerDiv.classList.add("image-container");

        let newImageDiv = document.createElement("div")
        newImageDiv.classList.add("image");


        let newImage = document.createElement("img")
        newImage.src = "./images/Logo_Explorex.png";


        let newImageAnimation = document.createElement("div")
        newImageAnimation.classList.add("circle");


        
        
        newImageDiv.appendChild(newImage);
        newImageDiv.appendChild(newImageAnimation);
        wholeContainerDiv.appendChild(newImageDiv);
        countryInfo.appendChild(wholeContainerDiv);

         setTimeout(function () {
            if (typeof nextFunction === 'function') {
              nextFunction(); // Call the provided next function
            }
          }, 2000);
    }

