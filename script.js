let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults")
let spinner = document.getElementById("spinner");
let errMsg = document.getElementById("errMsg")

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultItemContainer = document.createElement("div");
    resultItemContainer.classList.add("result-item");

    searchResults.appendChild(resultItemContainer);

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = link;
    resultTitle.target = "_blank"
    resultTitle.textContent = title;

    resultItemContainer.appendChild(resultTitle);

    let lineBreaker = document.createElement("br");

    resultItemContainer.appendChild(lineBreaker)

    let resultLink = document.createElement("a");
    resultLink.href = link;
    resultLink.textContent = link;
    resultLink.target = "_blank"
    resultLink.classList.add("result-url");

    resultItemContainer.appendChild(resultLink)


    let resultDescription = document.createElement("p");
    resultDescription.classList.add("link-description");
    resultDescription.textContent = description;

    resultItemContainer.appendChild(resultDescription);

}

function displaySearchResults(searchResults) {
    spinner.classList.toggle("d-none")
    for (let result of searchResults) {
        createAndAppendResult(result)
    }
}

function getResults(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none")
        let searchInputValue = searchInput.value
        if(searchInputValue === ""){
            errMsg.textContent = "Please enter a word before click Enter!";
            searchResults.textContent = ""
        }else{
            errMsg.textContent="";
        }
        let options = {
            method: "GET"
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData
                console.log(search_results)
                displaySearchResults(search_results)
            })
    }
}

searchInput.addEventListener('keydown', getResults)