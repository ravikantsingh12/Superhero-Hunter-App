// Retrieve favoritesList from local storage or initialize it as an empty array if it doesn't exist
var favoritesList = JSON.parse(localStorage.getItem('favoritesList')) || [];

// Accessing the HTML container where favorite characters will be displayed
const favoritesContainer = document.getElementById('favoritesContainer');

// Function to display favorite characters
const displayFavorites = () => {

    // Clearing existing content in the container
    favoritesContainer.innerHTML = '';

    // To check if favoritesList is not empty
    if (favoritesList.length > 0) {
        // Iterating over each character in favoritesList
        favoritesList.forEach((character) => {
            // Creating a card element for each favorite character
            const card = document.createElement('div');
            card.className = 'card';

            // Construct the HTML content for the card using character data
            let content = `<img class="card-img-top" id="characterImage" src="${character.thumbnail.path}.${character.thumbnail.extension}">
            <h5 class="card-title" title="${character.name}" id="characterName">${character.name}</h5>
            <div class="card-footer" id="cardBody" id="buttons">
                <button class="btn btn-outline-info" id="detailsButton" type="button" onClick=viewDetails(${character.id})>View Details</button>
                <button class="btn btn-outline-danger" id="removeFromFavoritesButton" type="button" onClick=removeFromFavorites(${character.id})>Remove from favorites</button>
            </div>`;

            // Setting the HTML content for the card
            card.innerHTML = content;

            // To append the card to the favorites container
            favoritesContainer.appendChild(card);
        });
    } else {
        // Display a message if favoritesList is empty
        favoritesContainer.innerHTML = '<div class="EmptyMessage"><h3>No favorite superheroes added yet!</h3></div>';
    };
};

// Function to remove a character from favorites
function removeFromFavorites(value) {

    // To filter out the character with the specified id from favoritesList
    favoritesList = favoritesList.filter((character) => character.id !== value);

    // Ipdating the local storage with the updated favoritesList
    localStorage.setItem('favoritesList', JSON.stringify(favoritesList));

    // To redisplay the favorites after removal
    displayFavorites();
}

// Function to open the Superhero Page with more details
function viewDetails(character) {
    var currentHero = favoritesList.filter((val) => {
        return val.id == character;
    });

    // To check if any hero found with the specified id
    if (currentHero.length > 0) {
        // Only the required key-value pairs are extracted from the first hero object in the filtered array
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

// Call the displayFavorites function when the page loads
displayFavorites()