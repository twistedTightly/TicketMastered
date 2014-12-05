/* resultsPage.js
 *
 * Javascript for random bits of the results page
 */


function notImplementedAlert() {
    return confirm("This functionality is not currently implemented. We apologize for the inconvenience.");
}

$(document).ready(function() {
	// Parse the search parameters from the URL
    var currentArtist = '';
    var currentDates = '';
    var currentLocation = ''; 
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "artist") {
                currentArtist = pair[1].replace('_', ' ');
                console.log(currentArtist);
            } else if (pair[0] === "location") {
            	currentLocation = pair[1].replace('_', ' ');
            	console.log(currentLocation);
            } else if (pair[0] === "dates") {
            	currentDates = pair[1].replace('-', ' ');
                console.log(currentDates);
            }
    }

    // Put into search query
    $('#query #artistNameParameter').val(currentArtist);
    $('#query #locationParameter').val(currentLocation);
    $('#query #datesParameter').val(currentDates);
});