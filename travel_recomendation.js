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

function adjustTimeZone(loc) {
  splited = loc.split(", ")
  if (splited[1] === "Brazil") {
    splited[0] = "Sao_Paulo"
    splited[1] = "America"
  } else if (splited[1] === "Japan") {
    splited[0] = "Tokyo"
    splited[1] = "Asia"
  }
  tmp = splited[0].split(" ")
  newStr = tmp.map((elem) => elem[0].toUpperCase() + elem.slice(1))
  splited[0] = newStr.join()
  return splited
}

function getLocalTime(location) {
  splited = adjustTimeZone(location)
  newTimeZone = `${splited[1]}/${splited[0].replaceAll(",", "_")}`
  const options = { timeZone: newTimeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const time = new Date().toLocaleTimeString('en-US', options);
  return time
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
        localTime = getLocalTime(item[i].name)
        time = document.createElement("p")
        time.classList.add("result-description")
        time.innerText = "loca time: " + localTime
        resultDiv.appendChild(img)
        resultDiv.appendChild(dataName)
        resultDiv.appendChild(time)
        resultDiv.appendChild(description)
        resultDiv.appendChild(visitButton)
      }
    }
    resultDiv.style.visibility = "visible"
  }

})()
