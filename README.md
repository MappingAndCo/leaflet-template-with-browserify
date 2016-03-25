# Leaflet template with browserify

A template utility for webmaps that provides a skeletal project using leaflet and browserify


## Dependencies

* node and npm

## Install via:

```
$ npm install
```

That will install [browserify](https://github.com/substack/node-browserify), [watchify](https://github.com/substack/watchify), [ESlint](https://www.npmjs.com/package/eslint), leaflet and jquery


## Usage

If we take a look at the **package.json** we'll see that there is 3 scripts:


```javascript
"scripts": {
    "build": "browserify app.js -o bundle.js",
    "watch": "watchify app.js -o bundle.js",
    "lint": "eslint app.js"
}
```

This means that when we run `$ npm run build` on the terminal, browserify will take everything that is required on **app.js** and write it out to a new file called **bundle.js**. That file is the only js file that we need to include on the **index.html**, forget about importing all the libraries one by one to get leaflet.js, jQuery, lodash ... all will be bundle in just one file.

That means that everytime you do a change on the code you need to do `$ npm run build`, BUT, to avoid that we use [watchify](https://github.com/substack/watchify). You just run `$ npm run watch`, and every time you save the bundle will automaticaly be compiled.

## Detect JavaScript Problems

This template has also one more tool called ESlint that will help you when writing Javascript code. 

To check you JS just run `$ npm run lint` to test **app.js** file, you also can do it directly with: `$ "eslint app.js`. ESlint use one configuration file called **.eslintrc** with the rules that you want to apply to your project. Be free to update mine to your necessities. For example the quotes rule `[2, "single"]` means that will lint as a error double quotes.


```javascript
{
    "rules": {
        "quotes": [2, "single"],
    }
}
```

* "off" or 0 - turn the rule off
* "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
* "error" or 2 - turn the rule on as an error (exit code will be 1)

## Example

Let's add leaflet to our app.js with a require(). You can use relative paths like './foo.js' for you're own modules.

In case you didnt notice Leaflet is also a [node module](https://www.npmjs.com/package/leaflet) that can be installed with `$ npm install leaflet --save`. This project has already it installed so we just need to call the leaflet module on our code:

```javascript
// require leaflet module
var L = require('leaflet');
```

After that you can use the **L** variable as usual to create a map, add a layer or whatever.

```javascript
// Create the map
var map = L.map('map').setView([41.3921, 2.1705], 13);

// Use OpenStreetMap tiles and attribution
var osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
 
// Create the basemap and add it to the map
L.tileLayer(osmTiles, {
    maxZoom: 18,
    attribution: attribution
}).addTo(map);
```

This template also includes some basic example with adding a geojson file. We will use the JQuery module

```javascript
// require jquery module
var $ = require('jquery')
```

Get geojson data using an AJAX request with the getJSON method: 

```javascript
// some geojson URL
var myURL = 'http://mappingandco.github.io/geojsonDB/barcelona/neighbourhoods.geojson'

$.getJSON(myURL, function(neighbourhoods) {
    L.geoJson(neighbourhoods, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.NBarri);
        }
    }).addTo(map);
});
```