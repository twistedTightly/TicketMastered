/*
 * This creates the map in a div with the id "map-canvas"
 */
function initialize() {
  var mapOptions = {
    center: { lat: 38.414478, lng: -96.881089},
    zoom: 5,
    streetViewControl: false,
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

// TODO: Add correct options
// Data that the dropdown will draw on for suggestions
var locations = ['New York', 'New York, NY', 'New Jersey', 'New Mexico',
'New Carlisle, IN', 'New Orleans, LA', 'New Buffalo, MI', 'New York University',
'New York, IA', 'New York City Hall'
];

$('#locationSearch .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'locations',
  displayKey: 'value',
  source: substringMatcher(locations) // function located in artistSearch.js
});


/* This function is called whenever a location is selected */
var locationSelected = function() {
  $('#locationSelection #skipToResults').css('display', 'block');
  $('#locationSelection .next').html('Continue ' + '<div class="glyphicon glyphicon-chevron-down" aria-hidden="true"></div>');

  // TODO: Drop pin on map
};

$(document).ready(function(){
  // When a location is selected from the list, the location appears
  // on the map and the skip to results button appears
  $('.tt-dataset-locations').click(locationSelected);

  // This triggers the UI changes if the enter button is pressed on the
  // location input box
  $('#locationInput').keyup(function(event){
      if(event.keyCode === 13){
          locationSelected();
      }
  });
});
