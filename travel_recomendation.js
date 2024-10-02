async function readJSON() {
  try {
    const response = await fetch("travel_recomendation_api.json")
    const data = await response.json()
    countries = data.countries
    delete data.countries
    for (country of countries) {
      data[country.name] = country.cities
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

function removeAllChild(node) {
  if (node.firstChild) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }
}

function seaerchInData(data, text) {
  let tmp = new Array()

  if (text === "") {
    return tmp
  }

  for (let key in data) {
    if (key.toLowerCase().search(text) >= 0) {
      tmp.push(data[key])
    }
  }

  return tmp
}

(async () => {
  const searchField = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")
  const clearButton = document.getElementById("clear-button")
  const data = await readJSON()

  clearButton.onclick = (e) => {
    resultDiv = document.getElementById("search-results")
    resultDiv.style.visibility = "hidden"
    removeAllChild(resultDiv)
    searchField.value = ""
  }

  searchButton.onclick = (e) => {
    const text = searchField.value.toLowerCase()
    const result = seaerchInData(data, text)
    resultDiv = document.getElementById("search-results")

    removeAllChild(resultDiv)

    if (result.length === 0) {
      resultDiv.style.visibility = "hidden"
      return
    }

    for (item of result) {
      for (let i = 0; i < item.length; i++) {
        img = document.createElement("img")
        img.setAttribute("src", "images/" + item[i].imageUrl)
        img.classList.add("result-img")
        dataName = document.createElement("p")
        dataName.innerText = item[i].name
        dataName.classList.add("result-name")
        description = document.createElement("p")
        description.innerText = item[i].description
        description.classList.add("result-description")
        visitButton = document.createElement("button")
        visitButton.innerText = "Visit"
        visitButton.classList.add("visit-button")
        resultDiv.appendChild(img)
        resultDiv.appendChild(dataName)
        resultDiv.appendChild(description)
        resultDiv.appendChild(visitButton)
      }
    }
    resultDiv.style.visibility = "visible"
  }

})()
