# Leaflet template with browserify

A template utility for webmaps that provides a skeletal project using leaflet and browserify


## Getting Started

Requires [node](https://nodejs.org/en/) and npm installed

Clone repo and install node modules:

```
$ git clone https://github.com/sigon426/leaflet-template-with-browserify.git
$ cd leaflet-template-with-browserify
$ npm install
```

This will install [Browserify](https://github.com/substack/node-browserify), [Watchify](https://github.com/substack/watchify), [ESlint](https://www.npmjs.com/package/eslint), [Leaflet](https://www.npmjs.com/package/leaflet) and [jQuery](https://www.npmjs.com/package/jquery) modules.


## Usage

If we take a look at the **package.json** we'll see that there are three scripts:


```javascript
"scripts": {
    "build": "browserify app.js -o bundle.js",
    "watch": "watchify app.js -o bundle.js",
    "lint": "eslint app.js"
}
```

This means that when we run `$ npm run build` on the terminal, browserify will take everything that is required on **app.js** and write it out to a new file called **bundle.js**. That file is the only js file that we need to include on the **index.html**, forget about importing all the libraries one by one to get leaflet.js, jQuery, lodash ... all will be bundle in just one file.

That means that everytime you do a change on the code you need to do `$ npm run build`, to avoid that we use [watchify](https://github.com/substack/watchify). You just type `$ npm run watch`, and every time you do a save the bundle will automaticaly be compiled.

## Detect JavaScript Problems

This template has also one more tool called [ESlint](http://eslint.org/) that will help you when writing Javascript code. You need to install it globally `$ npm install -g eslint`.

To check your JS just do `$ npm run lint` to test **app.js** file, you also can do it directly with: `$ eslint app.js`. ESlint use one configuration file called **.eslintrc** with the rules that you want to apply to your project. Be free to update mine to your necessities by adding your own rules. For example, the quotes rule `[2, "single"]` means that Eslint will print as a error double quotes.


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

Let's add the **Leaflet library** to our `app.js` with a require(). You can use relative paths like `./foo.js` for you're own modules.

In case you didn't notice Leaflet is also a [node module](https://www.npmjs.com/package/leaflet) that can be installed with `$ npm install leaflet --save`. This project has it already installed so we just need to call the leaflet module on our code:

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

This template also includes some basic example adding a geojson file. We will use the JQuery module here:

```javascript
// require jquery module
var $ = require('jquery')
```

Get geojson data using an AJAX request with the **getJSON** method: 

```javascript
// some geojson URL
var geojsonURL = 'http://mappingandco.github.io/geojsonDB/barcelona/neighbourhoods.geojson'

$.getJSON(geojsonURL, function(neighbourhoods) {
    L.geoJson(neighbourhoods, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.NBarri);
        }
    }).addTo(map);
});
```

## Source

https://github.com/sigon426/leaflet-template-with-browserify/tree/master

