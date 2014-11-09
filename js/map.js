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