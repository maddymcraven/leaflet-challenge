// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Get data

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(quakes) {
  console.log(quakes)
  var qfeats = quakes.features
  // Loop through the cities array and create one marker for each city object
  

  for (var i = 0; i < qfeats.length; i++) {
    var depth = quakes.features[i].geometry.coordinates[2];

    // Conditionals for countries points
    var color = "";
    if (depth > 200) {
      color = "red";
    }
    else if (depth> 100) {
      color = "yellow";
    }
    else if (depth > 90) {
      color = "green";
    }
    else {
      color = "blue";
    }

    var lat = quakes.features[i].geometry.coordinates[1];
    var lng = quakes.features[i].geometry.coordinates[0];
    var location = [lat, lng]
    console.log(location)

    // Add circles to map
    L.circle(location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: qfeats[i].properties.mag * 35000
    }).bindPopup("<h1>" + quakes.features[i].properties.title).addTo(myMap);
  }
});
