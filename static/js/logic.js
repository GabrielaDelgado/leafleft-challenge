var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

d3.json(Url).then(function(data) {
  createFeatures(data.features);
});

function markerColor(magnitude) {
    if (magnitude <= 1) {
        return "FFA07A"
    } else if (magnitude <= 2) {
        return "FA8072"
    } else if (magnitude <= 3) {
        return "CD5C5C"
    } else if (magnitude <= 4) {
        return "DC143C"
    } else if (magnitude <= 5) {
        return "B22222"
    } else {
        return "8B0000"
    }
};

function createFeatures(earthquake) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</h3><hr><p>" + "Magnitude: " + (feature.properties.mag) + "</p>");
    }

    let earthquakes = L.geoJSON(earthquake, {
        pointToLayer: function(feature, latlng) {
            return L.circlemarker(latlng, {
                radius: markerSIze(feature.properties.mag),
                fillColor: markerColor(feature.properties.ag),
            });
        },
        onEachFeature: onEachFeature
    });

    createImageBitmap(earthquakes);
}

function createMap(earthquakes) {

    let map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });



    let overlayMaps = {
        Earthquakes: earthquakes
    };

    let mapchart = L.map("map", {
        layers: [map, earthquakes]
    });

    dispatchEvent.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;

    
}