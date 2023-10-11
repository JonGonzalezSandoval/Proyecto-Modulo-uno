   let selectCountry=document.getElementById("chooseCountry")   
   let selectSubRegion = document.getElementById("chooseSubRegion")
   
   let finishRegion=document.getElementById("chooseRegion")
   finishRegion.addEventListener("change", chosenRegion=>{
   selectedRegion=chosenRegion.target.value
    loadSubregions(selectedRegion)

   }) 

   let finishSubRegion=document.getElementById("chooseSubRegion")
   finishSubRegion.addEventListener("change", chosenSubRegion=>{
   selectedSubRegion=chosenSubRegion.target.value
   loadCountries(selectedSubRegion)

   }) 

    function loadRegions(){
    createPlaceholder(chooseRegion)
    createPlaceholder(chooseSubRegion)
    createPlaceholder(chooseCountry)
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

            let selectRegion=document.getElementById("chooseRegion")
            regionList.forEach((chooseRegion)=>{
                
                let createRegion= document.createElement("option")
                createRegion.textContent=chooseRegion
                selectRegion.appendChild(createRegion)
            })
    })
    .catch((err)=>console.log(err));
}

chooseRegion = document.getElementById("chooseRegion")
chooseRegion.addEventListener("change", regionUrl=>{
    let selectedRegion = chooseRegion.value
    console.log(selectedRegion)
   removeChildren(selectCountry)
   createPlaceholder(chooseCountry)
})
       

    function loadSubregions(selectedRegion){
    
    fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
    .then((response)=>(response.json()))
    .then((data)=>{
      
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

            removeChildren(selectSubRegion)
            createPlaceholder(chooseSubRegion)

            subregionList.forEach((chooseSubRegion)=>{
                    
                    let createSubRegion= document.createElement("option")
                    if (createSubRegion== undefined){
                        console.log("error creating option ")
                    }

                    createSubRegion.textContent=chooseSubRegion

                    selectSubRegion.appendChild(createSubRegion)
            })
    })
    .catch((err)=>console.log(err));
}

    chooseSubRegion = document.getElementById("chooseSubRegion");
    chooseSubRegion.addEventListener("change", SubRegionUrl=>{
    let selectedSubRegion = chooseSubRegion.value
    console.log(selectedSubRegion)
    });


   
function loadCountries(selectedSubRegion){
  
    fetch(`https://restcountries.com/v3.1/subregion/${selectedSubRegion}`)
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
                

                removeChildren(selectCountry)
                createPlaceholder(chooseCountry)

                countryList.forEach((chooseCountry)=>{
                    
                    let createCountry= document.createElement("option")
                    createCountry.textContent=chooseCountry
                    selectCountry.appendChild(createCountry)
                })
        })
        .catch((err)=>console.log(err));
    }


function removeChildren(selectOption){
    while (selectOption.firstChild){
    selectOption.removeChild(selectOption.firstChild)
    }
}


function createPlaceholder(chosenSelection){
    let shortenChosenSelection= chosenSelection.id.substring(6)
    let placeholder=document.createElement("option")
    placeholder.selected=true;
    placeholder.disabled=true;
    placeholder.textContent=shortenChosenSelection
    chosenSelection.appendChild(placeholder)
}

loadRegions()


    