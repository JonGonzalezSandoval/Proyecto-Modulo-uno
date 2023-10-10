
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
    })
    .catch((err)=>alert(err));


   

