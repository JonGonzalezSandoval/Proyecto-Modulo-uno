chooseRegion = document.getElementById("chooseRegion")

loadMainRegions()

function loadMainRegions() {
    createPlaceholder(chooseRegion)
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
        .catch((err) => alert ("No se pudo cargar esta página"));
}

function createPlaceholder(chosenSelection) {
    let shortenChosenSelection = chosenSelection.id.substring(6)
    let placeholder = document.createElement("option")
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.textContent = shortenChosenSelection
    chosenSelection.appendChild(placeholder)
}