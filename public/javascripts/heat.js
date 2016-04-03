function initHeatMap() {
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

    new google.maps.visualization.HeatmapLayer({
      data: data,
      map: map,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ],
      radius: 10,
      opacity: 0.8
    });
  });
}

$(document).ready(function() {
  if ($('#heat-map').length > 0) {
    var map = initHeatMap();
    setupHeatMap(map);
  }
});
