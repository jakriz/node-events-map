function initMap() {
  return new google.maps.Map(document.getElementById('heat-map'), {
    center: { lat: 0, lng: 0 },
    zoom: 3,
    mapTypeControl: false,
    panControl: false,
    rotateControl: false,
    streetViewControl: false
  });
}

function setupHeatMap(map) {
  $.getJSON('/events', function(points) {
    data = _.map(points, function(point) {
      return new google.maps.LatLng(point.latitude, point.longitude);
    });

    console.log(data);
    new google.maps.visualization.HeatmapLayer({
      data: data,
      map: map
    });
  });
}

$(document).ready(function() {
  if ($('#heat-map').length > 0) {
    var map = initMap();
    setupHeatMap(map);
  }
});
