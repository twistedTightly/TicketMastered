/* resultsPage.js
 *
 * Javascript for random bits of the results page
 */

 var maroon5ChicagoTable = '<tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/m5logo.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Maroon 5</h3></td><td><p>Lincoln Hall</p></td><td><p>10:30 pm</p><p>Dec 11, 2014</p></td></tr><tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/jingleBall2014_2.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Z100\'s Jingle Ball 2014 - Presented by Goldfish Puffs</h3></td> <td><p>House of Blues</p></td><td><p>8:00 pm</p><p>Dec 12, 2014</p></td></div></tr><tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/m5logo.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Maroon 5</h3></td> <td><p>Park West</p></td><td><p>7:30 pm</p><p>Dec 10, 2014</p></td></tr>';

 var maroon5NYTable = '<tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/jingleBall2014_2.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Z100\'s Jingle Ball 2014 - Presented by Goldfish Puffs</h3></td><td><p>Madison Square Garden</p></td><td><p>8:00 pm</p><p>Dec 12, 2014</p></td></div></tr><tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/m5logo.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Maroon 5</h3></td><td><p>The Bowery Ballroom</p></td><td><p>10:30 pm</p><p>Dec 11, 2014</p></td></tr><tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/m5logo.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Maroon 5</h3></td><td><p>Rockwood Music Hall</p></td><td><p>7:30 pm</p><p>Dec 10, 2014</p></td></tr>';

var justinTimberlakeNYTable = '<tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/jingleBall2014_2.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Z100\'s Jingle Ball 2014 - Presented by Goldfish Puffs</h3></td><td><p>Madison Square Garden</p></td><td><p>8:00 pm</p><p>Dec 12, 2014</p></td></div></tr><tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/justin.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Justin Timberlake</h3></td><td><p>The Bowery Ballroom</p></td><td><p>10:30 pm</p><p>Dec 11, 2014</p></td></tr><tr class="clickableRow" href="concert_page.html"><td><img src="images/results_page/justin.jpg" alt="logo" class="img-circle" align="center" id="logo" width="50%"></td><td><h3>Justin Timberlake</h3></td><td><p>Rockwood Music Hall</p></td><td><p>7:30 pm</p><p>Dec 10, 2014</p></td></tr>';

var currentArtist = '';
var currentDates = '';
var currentLocation = '';

var artistCounter = 0;
var locationCounter = 0;
var datesCounter = 0;

function notImplementedAlert() {
    return alert("This functionality is not currently implemented. We apologize for the inconvenience.");
}

// Shows results for one of three searches: Maroon 5 in NY, Maroon 5 in Chicagom, or Justin Timberlake
function updateSearchResults() {
	$('tbody').empty();
	if (currentLocation === 'Chicago' || currentLocation === 'chicago') {
		$('tbody').append(maroon5ChicagoTable);
	} else if (currentArtist === 'Justin Timberlake') {
		$('tbody').append(justinTimberlakeNYTable);
	} else {
		$('tbody').append(maroon5NYTable);
	}
	$(".clickableRow").click(function() {
	    window.document.location = $(this).attr("href");
	});
}

function observeInputValue(value, id) {
	if (id === 'artistNameParameter') {
		if (currentArtist === value || artistCounter < 5) {
			artistCounter += 1;
		} else {
			currentArtist = value;
			artistCounter = 0;
			updateSearchResults();
		}
	} else if (id === 'locationParameter') {
		if (currentLocation === value || locationCounter < 5) {
			locationCounter += 1;
		} else {
			currentLocation = value;
			locationCounter = 0;
			updateSearchResults();
		}
	} else if (id === 'datesParameter') {
		if (currentDates === value || datesCounter < 5) {
			datesCounter += 1;
		} else {
			currentDates = value;
			datesCounter = 0;
			updateSearchResults();
		}
	}
}

$(document).ready(function() {
	// Parse the search parameters from the URL
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === "artist") {
                currentArtist = pair[1].replace('_', ' ');
            } else if (pair[0] === "location") {
            	currentLocation = pair[1].replace('_', ' ');
            } else if (pair[0] === "dates") {
            	currentDates = pair[1].replace('-', ' ');
            }
    }

    updateSearchResults();

    // Put into search query
    $('#query #artistNameParameter').val(currentArtist);
    $('#query #locationParameter').val(currentLocation);
    $('#query #datesParameter').val(currentDates);

    // Check for changes in input every 700ms
    setInterval(function() {
    	observeInputValue($('#artistNameParameter').val(), 'artistNameParameter');
    	observeInputValue($('#locationParameter').val(), 'locationParameter');
    	observeInputValue($('#datesParameter').val(), 'datesParameter');
    }, 1000);

	$(".clickableRow").click(function() {
	    window.document.location = $(this).attr("href");
	});
});

