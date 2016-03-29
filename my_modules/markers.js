var L = require('leaflet');

var bcnMarker = L.marker([41.3921, 2.1705]).bindPopup('Barcelona.<br> Come to visit me :)');

module.exports = bcnMarker;
