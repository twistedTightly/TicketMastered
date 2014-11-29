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

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'artists',
  displayKey: 'value',
  source: substringMatcher(artists)
});


 $(document).ready(function(){
 	// When an artist is selected from the list, the artist's info
 	// is dynamically displayed below the search bar.
 	$('.tt-dataset-artists').click(function() {
 		$('#skipToResults').css('display', 'block');
 	});
 });