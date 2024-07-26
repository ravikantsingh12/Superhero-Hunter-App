// DOM elements
const homePage = document.getElementById('home'),
    favorpage = document.getElementById('favorites'),
    searchInput = document.getElementById('searchInput'),
    contentContainer = document.getElementById('contentContainer');

// Marvel API credentials
const publicKey = "01ffda40c8cc1647ab10ed6b09f931ec",
    timeStamp = 1721994112925,
    hash = "d0518d6833fe225fda8e874b73023426";

// variable to store response data from API
var responseData;

// Marvel API endpoint URL
const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=1709740472213&apikey=01ffda40c8cc1647ab10ed6b09f931ec&hash=d0518d6833fe225fda8e874b73023426`;

// Retrieve favorites list from local storage or initialize as empty array
var favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];

// Creating variable to check if a character is already in favorites
var isAlreadyInFavorites;

// Function to fetch data from Marvel API
const getData = async () => {
    // Fetch data from Marvel API
    let response = await fetch(apiUrl);

    // Convert response to JSON
    let data = await response.json();
    responseData = data;
    // To update the HTML content with the retrieved data
    updateData(data);
};

// Function to get searched data
function getSearchedData() {
    var search = document.getElementById('searchInput');

    // To clear existing content in the content container
    contentContainer.innerHTML = '';

    inputValue = search.value;
    var output = responseData.data.results;
    searchedData = output.filter((val) => {
        return val.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    // To clear existing content in the content container
    contentContainer.innerHTML = '';

    //  To check if there are any search results obtained from the user input
    if (searchedData.length > 0) {
        // Create card elements for each character and display them
        let content = searchedData.forEach((character) => {
            // Create a card element for searched result
            const card = document.createElement('div');
            card.className = 'card';

            // To construct the HTML content for the card for the searched result
            let content = `<img class="card-img-top" id="characterImage" src="${character.thumbnail.path}.${character.thumbnail.extension}">
            <h5 class="card-title" title="${character.name}" id="characterName">${character.name}</h5>
            <div class="card-footer" id="cardBody" id="buttons">
                <button class="btn btn-outline-info" id="detailsButton" type="button" onClick=viewDetails(${character.id})>View Details</button>
                
                <!-- Changing the name of button and class to use different color while hover -->
                <button class="btn ${isFav(character.id) ? 'btn-outline-danger' : 'btn-outline-warning'} favoritesButton" type="button" onClick=checkButton(${character.id})>${isFav(character.id) ? 'Remove from favorites' : 'Add to favorites'}</button>
            </div>`;

            // To set the HTML content for the card
            card.innerHTML = content;

            // To append the card to the content container (it will show the searched character)
            contentContainer.appendChild(card);
        });
    } else {
        // Display a message indicating that no superheroes were found with the given search query
        contentContainer.innerHTML = '<h3 class="notFound">No Superhero found with this name!</h3>';
    }
}

// Function to update HTML content with Marvel API data
const updateData = (data) => {
    // Clear existing content in the content container
    contentContainer.innerHTML = '';

    // To extract character results from the API response
    const results = data.data.results;

    // To iterate over each character and create a card for them
    results.forEach((character) => {
        // Create a card element
        const card = document.createElement('div');
        card.className = 'card';

        // To construct the HTML content for the card
        let content = `<img class="card-img-top" id="characterImage" src="${character.thumbnail.path}.${character.thumbnail.extension}">
            <h5 class="card-title" title="${character.name}" id="characterName">${character.name}</h5>
            <div class="card-footer" id="cardBody" id="buttons">
                <button class="btn btn-outline-info" id="detailsButton" type="button" onClick=viewDetails(${character.id})>View Details</button>
                
                <!-- Changing the name of button and class to use different color while hover -->
                <button class="btn ${isFav(character.id) ? 'btn-outline-danger' : 'btn-outline-warning'} favoritesButton" type="button" onClick=checkButton(${character.id})>${isFav(character.id) ? 'Remove from favorites' : 'Add to favorites'}</button>
            </div>`;

        // To set the HTML content for the card
        card.innerHTML = content;

        // To append the card to the content container
        contentContainer.appendChild(card);
    });
};

// Function to open the Superhero Page with more details
function viewDetails(value) {
    let random = responseData.data.results;

    // To filter the responseData to find the currentHero with the specified id
    var currentHero = random.filter((val) => {
        return val.id == value;
    });

    // Check if any hero found with the specified id
    if (currentHero.length > 0) {
        // Extractd only the required key-value pairs from the first hero object in the filtered array
        let selectedData = {
            id: currentHero[0].id,
            name: currentHero[0].name,
            thumbnail: currentHero[0].thumbnail,
            stories: currentHero[0].stories?.available,
            comics: currentHero[0].comics?.available,
            events: currentHero[0].events?.available,
            series: currentHero[0].series?.available,
            description: currentHero[0].description
        };

        // Converting the selected character data into a JSON string for passing it as a query parameter in the URL
        let newData = encodeURIComponent(JSON.stringify(selectedData));

        // To redirect to the Superhero Page with the selected character's name
        window.location.href = `characterInfo.html?name=${newData}`;
    }
}


// Function to check if a character is in the favorites list
function isFav(value) {
    // Check if any character in the favorites list has the same id as the provided value
    return favoritesList.some((character) => character.id === value);
}

// Function to add or remove a character from favorites
function checkButton(value) {
    // Retrieve favorites list from local storage or initialize as empty array
    favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];

    // Check if the character is already in favorites
    isAlreadyInFavorites = favoritesList.some((character) => character.id === value);

    // If the character is not in favorites, add it; otherwise, remove it
    if (!isAlreadyInFavorites) {
        // Find the selected character from the response data
        var selectedCharacter = responseData.data.results.find((character) => character.id === value);
        // Add the selected character to the favorites list
        favoritesList.push(selectedCharacter);
    } else {
        // Remove the character from favorites if it's already in the list
        favoritesList = favoritesList.filter((character) => character.id !== value);
    }

    // Store the updated favorites list in local storage
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList));

    // Update the displayed data with the response data from the Marvel API
    updateData(responseData);
}

// Initial data retrieval when the page loads
const infoPage = getData()
