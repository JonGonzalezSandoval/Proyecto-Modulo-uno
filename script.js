let cambioRegion = document.getElementById("chooseRegion");
let cambioSubregion = document.getElementById("chooseSubRegion");

let placeholder = document.createElement("option")


let temo = cambioRegion.name;


placeholder.selected = true;
placeholder.disabled = true;
placeholder.textContent = temo;




cambioRegion.addEventListener("change", element =>{

let selectedRegion = element.target.value

    loadSubregions(selectedRegion);

})
cambioSubregion.addEventListener("change", element =>{

let selectedRegion = element.target.value

    loadCountries(selectedRegion);

})


function loadRegions(){
    fetch("https://restcountries.com/v3.1/all")
    .then((response)=>(response.json()))
    .then((data)=>{
        let regionList=[]
            data.forEach(countryNameRegion => {
                let region=countryNameRegion.region
                
                if (!regionList.includes(region)){
                    regionList.push(region)
                }
            })
            console.log(regionList)
            regionList.forEach((chooseRegion)=>{
                let selectRegion=document.getElementById("chooseRegion")
                let createRegion= document.createElement("option")
                createRegion.textContent = chooseRegion
                selectRegion.appendChild(createRegion)
            })


            cambioRegion.appendChild(placeholder)

            
    })
    .catch((err)=>console.log(err));
}




function loadSubregions(selectedRegion){

    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
    .then((response)=>(response.json()))
    .then((data)=>{
        console.log(data);

        let subregionList=[]
        data.forEach(countryNameSubregion => {
            let subregion=countryNameSubregion.subregion
            
            if(subregion != undefined){
                    if (!subregionList.includes(subregion)){
                        subregionList.push(subregion)
                    }
                }
                               
            })

            console.log(subregionList)


            let selectSubRegion = document.getElementById("chooseSubRegion")

            console.log(selectSubRegion);

            subregionList.forEach((chooseSubRegion)=>{
                   
                    let createSubRegion= document.createElement("option")
                    if (createSubRegion== undefined){
                        console.log("error creating option ")
                    }

                    createSubRegion.textContent= chooseSubRegion

                    selectSubRegion.appendChild(createSubRegion)
            })
    })
    .catch((err)=>console.log(err));
}

function loadCountries(paisSeleccionado){

    fetch(`https://restcountries.com/v3.1/subregion/${paisSeleccionado}`)//   `https://restcountries.com/v3.1/subregion/${selectedSubregion}`
        .then((response)=>(response.json()))
        .then((data)=>{
            let countryList=[]
                data.forEach(countryName => {
                    let country=countryName.name.common 
                    if (!countryList.includes(country)){
                        countryList.push(country)
                    }
                })
                console.log(countryList)
                let selectCountry=document.getElementById("chooseCountry")
                countryList.forEach((chooseCountry)=>{
                    let createCountry= document.createElement("option")
                    createCountry.textContent = chooseCountry
                    selectCountry.appendChild(createCountry)
                })
        })
        .catch((err)=>console.log(err));
    }

    loadRegions()






    function randomCountry(){
        fetch("https://restcountries.com/v3.1/all")//   `https://restcountries.com/v3.1/subregion/${selectedSubregion}`
        .then((response)=>(response.json()))
        .then((data)=>{

            console.log(data[0]);

            let randomCountry = data[Math.floor(Math.random()*data.length)]

            let divSelectedCountry = document.getElementById("countryInfo");

            divSelectedCountry.appendChild(createSelectedCountrysDiv(randomCountry))
            


        })
    }



    function createSelectedCountrysDiv(selectedCountry){
        let countryDiv = document.createElement("div")
        let countryName = document.createElement("h3")
        let countryFlag = document.createElement("img")

        countryName.textContent = selectedCountry.name.common
        countryFlag.src = selectedCountry.flags.png
        countryFlag.alt = selectedCountry.name

        countryDiv.appendChild(countryFlag);
        countryDiv.appendChild(countryName);


        return countryDiv;

    }

    randomCountry();
