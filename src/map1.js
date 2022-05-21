mapboxgl.accessToken =
'pk.eyJ1Ijoia2plMTIzIiwiYSI6ImNsM2Zrd3ViZjA2cW8za2xxcG5hdnQ2NGYifQ.QtV_WqQeBghSOpmhrJGUIw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1, // starting zoom
    center: [-96, 40] // starting center
});

map.on('load', () => {
    map.addSource('terrorism-events', {
        type: 'geojson',
        data: 'assets/gtd_geojson_arcgis.geojson'
    });

    map.addLayer({
        'id': 'terrorism-events-layer',
        'type': 'symbol',
        'source': 'terrorism-events'
    });
});