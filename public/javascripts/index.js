function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
    mapTypeControl: false,
    panControl: false,
    rotateControl: false,
    streetViewControl: false
  });
}

$(document).ready(function() {
  initMap();
});
