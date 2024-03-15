// This event listener ensures that the code executes only when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieving superhero name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Getting the value of the 'name' parameter from the URL
    const superheroName = urlParams.get('name');
    
    // Decoding and parsing the superhero name from URL parameter
    var superhero = JSON.parse(decodeURIComponent(superheroName));

    // Constructing the HTML content dynamically
    const content = ` 
        <!-- To center align the container -->
        <div class="d-flex justify-content-center"> <!-- Center align container -->
            <div class="card custom-border" style="max-width: 900px;">
                <div class="row">
                    <div class="col-md-5">
                    <!-- To displaying the superhero image -->
                    <img src="${superhero.thumbnail?.path}.${superhero.thumbnail?.extension}" class="card-img-top img-fluid" style="height: 100%; object-fit: cover;" alt="${superhero.name}">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <div id="details">
                                <!-- To displaying superhero details -->
                                <h3 class="card-title"><strong>Name: </strong>${superhero.name}</h3>
                                <p>
                                    <strong>ID:</strong> ${superhero.id || 'ID not available'}<br>
                                    <strong>Stories:</strong> ${superhero.stories || 'No Comics available'}<br>
                                    <strong>Comics:</strong> ${superhero.comics || 'No Comics available'}<br>
                                    <strong>Events:</strong> ${superhero.events || 'No events available'}<br>
                                    <strong>Series:</strong> ${superhero.series || 'No Series available'}<br>
                                    <strong>Description:</strong> ${superhero.description || 'No description available'}<br><br>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- "Go to Homepage" button -->
        <div id="homePageButton" class="mt-3 text-center">
            <a href="index.html" class="btn btn-primary">Go to Homepage</a>
        </div>
    `;

    // Updating the HTML content of the container with the constructed content
    document.getElementById('superheroDetailsContainer').innerHTML = content;
});
