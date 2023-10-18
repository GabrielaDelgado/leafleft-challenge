var map = L.map('map').setView([-10, -40], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(Url).then(function (data) {
    console.log(data.features[100]);
    createFeatures(data);
});

function createFeatures(earthquake) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</h3><hr><p>" + "Magnitude: " + (feature.properties.mag) + "</p>");
    }

    let earthquakes = L.geoJSON(earthquake, {
        pointToLayer: function (feature, latlng) {
            let depth = feature.geometry.coordinates[2];

            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 4,
                weight: 1,
                color: 'black',
                fillOpacity: .75,
                fillColor:
                    depth < 10 ? 'green' :
                        depth < 30 ? 'lime' :
                            depth < 50 ? 'yellow' :
                                depth < 70 ? 'orange' :
                                    depth < 90 ? 'darkorange' : 'red'
            });
        },
        onEachFeature: onEachFeature
    }).addTo(map);
};

let Legend = L.control({ position: 'bottomright' });

Legend.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    div.innerHTML = `
        <div style="background:green;color:white;padding:2px"> -10 - 10</div>
        <div style="background:lime;color:white;padding:2px"> -10 - 30</div>
        <div style="background:yellow;color:white;padding:2px"> -30 - 50</div>
        <div style="background:orange;color:white;padding:2px"> -50 - 70</div>
        <div style="background:darkorange;color:white;padding:2px"> -70 - 90</div>
        <div style="background:red;color:white;padding:2px"> -90 +</div>
    `;
    return div;
};

Legend.addTo(map);