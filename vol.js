let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");
let keywordResult = document.getElementById("keywordResult");

let videoSectionEl = document.getElementById("videoSection");

let divCont = document.createElement("div");

function createAndAppend(eachItem) {
    let title = eachItem.snippet.channelTitle;
    let videoDescription = eachItem.snippet.description;

    videoSectionEl.classList.remove("d-none");

    //cardCont
    let cardCont = document.createElement("div");
    cardCont.classList.add("card-cont");
    videoSectionEl.appendChild(cardCont);

    //para
    let paraEl = document.createElement("p");
    paraEl.textContent = videoDescription;
    cardCont.appendChild(paraEl);


}

function displayYoutubeData(data) {
    videoSectionEl.textContent = ""
    for (let eachItem of data.items) {
        createAndAppend(eachItem);
    }
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    let result = searchResults.pageInfo.totalResults;

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function calculateDaysDifference(currentDate, previousMonthDate) {
        const timeDifference = currentDate - previousMonthDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return daysDifference;
    }

    // Get the current date
    const currentDate = new Date();

    // Calculate the date one month ago
    const previousMonthYear = currentDate.getFullYear();
    const previousMonth = currentDate.getMonth() - 1;
    const previousMonthDay = Math.min(currentDate.getDate(), getDaysInMonth(previousMonthYear, previousMonth));
    const previousMonthDate = new Date(previousMonthYear, previousMonth, previousMonthDay);

    // Calculate the exact difference in days
    const daysDifference = Math.ceil(calculateDaysDifference(currentDate, previousMonthDate)) - 1;

    keywordResult.textContent = "Result: " + Math.ceil(result / daysDifference) + " searches/month";
    displayYoutubeData(searchResults);
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        videoSectionEl.classList.add("d-none");
        spinnerEl.classList.remove("d-none");
        keywordResult.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBzCydVlP-Xfib-vjNfQibSQuVX7FCcZl4&type=search.list&q=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                displayResults(jsonData);

            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);