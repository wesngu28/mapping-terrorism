mapboxgl.accessToken =
'pk.eyJ1Ijoia2plMTIzIiwiYSI6ImNsM2Zrd3ViZjA2cW8za2xxcG5hdnQ2NGYifQ.QtV_WqQeBghSOpmhrJGUIw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 2.5, // starting zoom
    center: [-96, 40] // starting center
});

map.on('load', () => {
    map.addSource('terrorism-events', {
        type: 'geojson',
        data: './assets/gtd_geojson_arcgis.geojson'
    });

    map.loadImage(
        '/assets/marker.png',
        (error, image) => {
            if (error) throw error;
            // Add the image to the map style.
            map.addImage('marker', image);
        }
    )

    map.addLayer({
        'id': 'terrorism-events-layer',
        'type': 'symbol',
        'source': 'terrorism-events',
        'layout': {
            'icon-image': 'marker', // reference the image
            'icon-size': 0.025
        }
    });
});