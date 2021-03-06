(function () {
   'use strict';
    // require modules
    var $ = require('jquery');
    var L = require('leaflet');
    // var Hash = require('leaflet-hash');
    require('leaflet-hash');
    var bcnmarker = require('./my_modules/markers');

    // Indicate leaflet the specific location of the images folder that it needs to render the page
    L.Icon.Default.imagePath = 'lib/leaflet/images/';

    // Create the map
    var map = L.map('map').setView([41.3921, 2.1705], 13);

    // Use OpenStreetMap tiles and attribution
    var osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | <a href="https://github.com/sigon426">sigon</a>';

    // Create the basemap and add it to the map
    L.tileLayer(osmTiles, {
        maxZoom: 18,
        attribution: attribution
    }).addTo(map);

    var hash = new L.Hash(map);

    // Add a marker
    bcnmarker.addTo(map).openPopup();

    // Add some geojson
    var geojsonURL = 'http://mappingandco.github.io/geojsonDB/barcelona/neighbourhoods.geojson';

    $.getJSON(geojsonURL, function(neighbourhoods) {
        L.geoJson(neighbourhoods, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.NBarri);
            },
            style: function(){
                return {
                    fillColor: '#FC4E2A',
                    fillOpacity: 0.5,
                    weight: 1,
                    color: '#800026'
                };
            }
        }).addTo(map);
    });

}());
