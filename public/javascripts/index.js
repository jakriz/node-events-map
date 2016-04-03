function initRealtimeMap() {
  return new google.maps.Map(document.getElementById('realtime-map'), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
    mapTypeControl: false,
    panControl: false,
    rotateControl: false,
    streetViewControl: false
  });
}

function setupRealtimeMapSocket(map) {
  var socket = io();
  socket.on('event.new', function(event) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(event.latitude, event.longitude),
      map: map
    });
    removeMarkerAfter(marker, 8000);
  });
}

function removeMarkerAfter(marker, timeout) {
    setTimeout(function() {
      marker.setMap(null)
    }, timeout);
  }

$(document).ready(function() {
  if ($('#realtime-map').length > 0) {
    var map = initRealtimeMap();
    setupRealtimeMapSocket(map);
  }
});
