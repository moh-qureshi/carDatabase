const carList = document.getElementById("car-list")
const modelList = document.getElementById("model-list")
const displayList = document.getElementById("car-display-list")
const searchBar = document.getElementById("search-bar")
let allMakes = []

window.addEventListener("load", loadMakes())
function loadMakes(){
fetch('https://cardatabaseinfo.herokuapp.com/vehicles')
    .then(res => res.json())
    
    .then(data => {
        for(let i = 0; i < data.makes.length; i++){
            allMakes.push(data.makes[i].make[0].name)
        }
        for(let i = 0; i < allMakes.length; i++){
            const carMakeDivs = document.createElement("div")
            carList.appendChild(carMakeDivs).setAttribute("class", "car-makes-list")
            const carText = document.createElement("p")
            carMakeDivs.appendChild(carText).setAttribute("class", "car-logo-text")
            carText.style.display = "none"
            carText.innerText = allMakes[i].toUpperCase()
            carText.innerText = carText.innerText.replace("_", " ")
            carList.appendChild(carMakeDivs)
            const carMakeLogo = document.createElement("img")
            carMakeLogo.src = data.makes[i].make[0].make_logo
            carMakeDivs.appendChild(carMakeLogo).setAttribute("class", "car-make-logo")
            carMakeDivs.style.opacity = 0.8
            carMakeDivs.addEventListener("mouseenter", () =>{
                carMakeDivs.style.opacity = 0.9
                carMakeLogo.style.display = "none"
                carText.style.display = "initial"
            })
            carMakeDivs.addEventListener("mouseleave", () =>{
                carMakeDivs.style.opacity = 0.8
                carMakeLogo.style.display = "initial"
                carText.style.display = "none"
            })
            carMakeDivs.addEventListener("click", () =>{
                carList.style.display = "none"
                modelList.style.display = "grid"
                carText.innerText = carText.innerText.replace(" ", "_")
                const selectedMake = carText.innerText.toLowerCase()
                displayModelsFunc(selectedMake)
                searchBar.value=""
                searchBar.removeAttribute("onkeyup")
                searchBar.setAttribute("onkeyup", "searchModel()")
            })
        }
    })
}
    function displayModelsFunc(make){
    fetch('https://cardatabaseinfo.herokuapp.com/vehicles/'+ make)
    .then(res => res.json())
    .then(data => {
        const allModels = data.make.model
        for(let i = 0; i < allModels.length; i++){
            const carModelDivs = document.createElement("div")
                const carModelThumbnail = document.createElement("div")
                const thumbnailText = document.createElement("p")
                const thumbnailImage = document.createElement("img")
                modelList.appendChild(carModelDivs).setAttribute("class", "car-model-list")
                carModelDivs.appendChild(carModelThumbnail).setAttribute("class", "model-thumbnail")
                carModelThumbnail.appendChild(thumbnailImage)
                carModelDivs.appendChild(thumbnailText).setAttribute("class", "thumbnail-text")
                thumbnailText.innerText = `${make} ${allModels[i].name}`.replace(/_/g, " ").toUpperCase()
                thumbnailImage.src = allModels[i].car_img[0]    
                carModelDivs.addEventListener("click", () =>{
                    modelList.style.display = "none"
                    displayList.style.display = "flex"
                    const selectedModel = allModels[i].name
                    displayScreenFunc(make,selectedModel)
                })
            }
        })
    }

    function displayScreenFunc(make, model){
        fetch('https://cardatabaseinfo.herokuapp.com/vehicles/'+ make + '/' + model)
        .then(res => res.json())
        .then(data =>{
            const modelData = data.model[0].model
            const displayTitleText = document.createElement("p")
            displayList.appendChild(document.createElement("div")).setAttribute("id", "feature-screen")
            const featureScreen = document.getElementById("feature-screen")
            featureScreen.appendChild(document.createElement("ul")).setAttribute("id", "features-list")
            for(let i = 0; i < modelData.features.length; i++){
                document.getElementById("features-list").appendChild(document.createElement("li")).textContent = modelData.features[i]
            }
            
            
            const displayScreen = document.createElement("div")
            displayScreen.appendChild(displayTitleText)
            displayTitleText.innerText = make.toUpperCase() + " " + model.replace("_", " ").toUpperCase()
            displayTitleText.innerText = displayTitleText.innerText.replace("_", " ")
            displayList.appendChild(displayScreen).setAttribute("id", "display-screen")

            displayList.appendChild(document.createElement("div")).setAttribute("id", "spec-screen")
            
            displayScreen.appendChild(document.createElement("div")).setAttribute("class", "display-thumbnails top")
            displayScreen.appendChild(document.createElement("div")).setAttribute("class", "main-display")
            displayScreen.appendChild(document.createElement("div")).setAttribute("class", "display-thumbnails bottom")
            const thumbnailImages = displayScreen.querySelectorAll(".display-thumbnails")
            populateThumbnails(thumbnailImages[0])
            populateThumbnails(thumbnailImages[1])
            for(let i = 0; i < thumbnailImages[0].querySelectorAll("img").length; i++){
                thumbnailImages[0].querySelectorAll("img")[i].src = modelData.car_img[i+1]
                thumbnailImages[1].querySelectorAll("img")[i].src = modelData.car_img[i+4]
                thumbnailImages[0].querySelectorAll("img")[i].addEventListener("click", ()=>{
                document.querySelector(".main-display").querySelector("img").src = thumbnailImages[0].querySelectorAll("img")[i].src
                })
                thumbnailImages[1].querySelectorAll("img")[i].addEventListener("click", ()=>{
                document.querySelector(".main-display").querySelector("img").src = thumbnailImages[1].querySelectorAll("img")[i].src
                })
            }
            document.querySelector(".main-display").appendChild(document.createElement("img"))
            document.querySelector(".main-display").querySelector("img").src = modelData.car_img[0]
            
            displayScreen.appendChild(document.createElement("div")).setAttribute("id", "car-info-screen")
            const carInfoScreen = document.getElementById("car-info-screen")
            carInfoScreen.appendChild(document.createElement("ul")).setAttribute("id", "car-info-list")
            for(let i = 0; i < 4; i++){
                document.getElementById("car-info-list").appendChild(document.createElement("div"))[i]
            }
            for(let i = 0; i < carInfoScreen.querySelectorAll("div").length; i++){
                carInfoScreen.querySelectorAll("div")[i].appendChild(document.createElement("i")).setAttribute("class", "car-info-icon")
                carInfoScreen.querySelectorAll("div")[i].appendChild(document.createElement("p")).setAttribute("class", "car-info-text")
            }
            carInfoScreen.querySelectorAll(".car-info-text")[0].textContent = modelData.body_type
            carInfoScreen.querySelectorAll(".car-info-icon")[0].setAttribute("class", "fa-solid fa-car-side")
            carInfoScreen.querySelectorAll(".car-info-text")[1].textContent = `${modelData.doors} doors`
            carInfoScreen.querySelectorAll(".car-info-icon")[0].setAttribute("class", "fa-solid fa-door-closed")
            carInfoScreen.querySelectorAll(".car-info-text")[2].textContent = `${modelData.people} seats`
            carInfoScreen.querySelectorAll(".car-info-icon")[0].setAttribute("class", "fa-solid fa-users")
            carInfoScreen.querySelectorAll(".car-info-text")[3].textContent = modelData.fuel_type
            carInfoScreen.querySelectorAll(".car-info-icon")[0].setAttribute("class", "fa-solid fa-gas-pump")
        })
    }

    function populateThumbnails(div){    
        for(let i = 0; i < 4; i++){
            const displayThumbnailImage = document.createElement("img")
            div.appendChild(displayThumbnailImage)
        }
    }
    function searchMake(){
            for(let i = 0; i < carList.querySelectorAll(".car-makes-list").length;i++){
                let filteredMakes = carList.querySelectorAll(".car-makes-list")[i].querySelector("p").textContent
                if(!filteredMakes.includes(searchBar.value.toUpperCase())){
                    carList.querySelectorAll(".car-makes-list")[i].style.display = "none"
                }else if(filteredMakes.includes(searchBar.value.toUpperCase())){
                    carList.querySelectorAll(".car-makes-list")[i].style.display="flex"
                }
            }
    }

    function searchModel(){
        for(let i = 0; i < modelList.querySelectorAll(".car-model-list").length;i++){
            let filteredMakes = modelList.querySelectorAll(".car-model-list")[i].querySelector("p").textContent
            if(!filteredMakes.includes(searchBar.value.toUpperCase())){
                modelList.querySelectorAll(".car-model-list")[i].style.display = "none"
            }else if(filteredMakes.includes(searchBar.value.toUpperCase())){
                modelList.querySelectorAll(".car-model-list")[i].style.display="flex"
            }
        }
    }
    function test(){
        window.location = "/"
    }