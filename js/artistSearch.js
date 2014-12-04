/* artistSearch.js
 * 
 * Fake backend for the artist selection section of the main page
 *
 */

// Example from http://twitter.github.io/typeahead.js/examples/
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  };
};

// Data that the dropdown will draw on for suggestions
var artists = ['Maroon 5', 'Macklemore', 'Mariah Carey', 'Mat Kearney',
'Bruno Mars', 'Maroon Town', '50 Cent', '5 Seconds of Summer',
'Miley Cyrus', 'Marvin Gaye'
];

$('#artistSearch .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'artists',
  displayKey: 'value',
  source: substringMatcher(artists)
});


/* This function is called whenever an artist is selected */
var artistSelected = function() {
	$('#artistSelectionSection #skipToResults').css('display', 'block');
	$('#artistSelectionSection .next').html('Continue ' + '<div class="glyphicon glyphicon-chevron-down" aria-hidden="true"></div>');

	// Add the artist info section
	$('#artistInfo').append('<img alt="Maroon 5" src="images/homepage/maroon5-circle_200x200.png"><h1>Maroon 5</h1>');
 };

// Makes smooth scrolling for links to anchors on the same page
 $(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});

 $(document).ready(function(){
 	// When an artist is selected from the list, the artist's info
 	// is dynamically displayed below the search bar.
 	$('.tt-dataset-artists').click(artistSelected);
 	// This triggers the UI changes if the enter button is pressed on the
 	// artist input box
 	$('#artistNameInput').keyup(function(event){
	    if(event.keyCode === 13){
	        artistSelected();
	    }
	});

// Positioning the arist skip button
var artistSelectionBottom = $(document).height() - $('nav').outerHeight() - $('#artistSelectionSection').outerHeight()
			- $('#artistSelectionSection .next').outerHeight() - 50;
	$('#artistSelectionSection .next').affix({
		// The extra 50 at the end corresponds to the top margin of the locationSelection div
	offset: {
		bottom: artistSelectionBottom
	}

});

	// Positioning the location skip button
	var locationSelectionBottom = $('#dateSelectionSection').outerHeight() + 100;
  var locationSelectionTop = $('nav').outerHeight() + $('#artistSelectionSection').outerHeight();
	$('#locationSelection .next').affix({
	offset: {
		top: locationSelectionTop,
		bottom: locationSelectionBottom
	}
});

 	// Positioning the final "Go to Results" button in the date selection section
 	$('#goToResults').affix({
 		offset: {
			top: $('nav').outerHeight() + $('#artistSelectionSection').outerHeight() + $('#locationSelection').outerHeight() + 200
		}
 	});

 	// Stop links to anchors on the same page from refreshing the whole page
	$('a.anchor-link').click(function() {
		return false;
	});

 });