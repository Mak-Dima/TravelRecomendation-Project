async function readJSON() {
  try {
    const response = await fetch("travel_recomendation_api.json")
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

function seaerchInData(data, text) {
  let tmp = new Array()

  for (let key in data) {
    if (key.search(text) >= 0) {
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
    while (resultDiv.firstChild) {
      resultDiv.removeChild(resultDiv.firstChild)
    }
    searchField.value = ""
  }

  searchButton.onclick = (e) => {
    const text = searchField.value.toLowerCase()
    const result = seaerchInData(data, text)
    resultDiv = document.getElementById("search-results")

    if (result.length === 0) {
      return
    }

    for (item of result) {
      for (let i = 0; i < item.length; i++) {
        console.log(item[i])
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
