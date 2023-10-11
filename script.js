    loadRegions()
    loadSubregions()
    loadCountries()

    function loadSubregions(){
    fetch("https://restcountries.com/v3.1/all")
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

            subregionList.forEach((chooseSubRegion)=>{
                    let selectSubRegion = document.getElementById("chooseSubRegion")
                    let createSubRegion= document.createElement("option")
                    if (createSubRegion== undefined){
                        console.log("error creating option ")
                    }

                    createSubRegion.textContent=`${chooseSubRegion}`

                    selectSubRegion.appendChild(createSubRegion)
            })
    })
    .catch((err)=>console.log(err));

}
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
                createRegion.textContent=`${chooseRegion}`
                selectRegion.appendChild(createRegion)
            })
    })
    .catch((err)=>console.log(err));
}
   
function loadCountries(){
    fetch("https://restcountries.com/v3.1/all")
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
                countryList.forEach((chooseCountry)=>{
                    let selectCountry=document.getElementById("chooseCountry")
                    let createCountry= document.createElement("option")
                    createCountry.textContent=`${chooseCountry}`
                    selectCountry.appendChild(createCountry)
                    return countryList
                })
        })
        .catch((err)=>console.log(err));
    }

