const carList = document.getElementById("car-list")
const searchBar = document.getElementById("search-bar")

let allMakes = []
fetch('https://private-anon-96247447db-carsapi1.apiary-mock.com/manufacturers'
    )
    .then(res => res.json())
    
    
    .then(data => {
        for(let i = 0; i < data.length; i++){
            allMakes.push(data[i].name)
            allMakes.sort()
        }
        for(let i = 0; i < allMakes.length; i++){
            const carTextDivs = document.createElement("div")
            carList.appendChild(carTextDivs).setAttribute("class", "car-makes-list")
            const carText = document.createElement("p")
            carTextDivs.appendChild(carText)
            carText.innerText = allMakes[i].toUpperCase()
            carList.appendChild(carTextDivs)
            // const carLogoImg = document.createElement("img")
            // carLogoImg.src = data[i].img_url
            // carTextDivs.appendChild(carLogoImg)
        }
    })

    fetch(`http://localhost:5001/allMakes`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

    searchBar.addEventListener("keyup", (e) =>{
        const allBrands = carList.querySelectorAll("p")
        for(let i = 0; i < allBrands.length; i++){
            filteredMakes = allBrands[i].textContent
            if(!filteredMakes.includes(searchBar.value)){
                allBrands[i].style.display="none"
            } else if(filteredMakes.includes(searchBar.value)){
                allBrands[i].style.display="initial"
            }
        }
    })