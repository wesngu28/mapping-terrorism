mapboxgl.accessToken =
  "pk.eyJ1Ijoia2plMTIzIiwiYSI6ImNsM2Zrd3ViZjA2cW8za2xxcG5hdnQ2NGYifQ.QtV_WqQeBghSOpmhrJGUIw";
let map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 2.5, // starting zoom
  minZoom: 1.5, // set minimum zoom level and avoid showing the entire map
  maxZoom: 12, // set maximum zoom level
  center: [-96, 40], // starting center
});

map.on("load", () => {
  map.addSource("terrorism-events", {
    type: "geojson",
    data: "./assets/gtd.geojson",
    cluster: true, // enable clustering
    clusterMaxZoom: 4, // Max zoom to cluster points on
    clusterRadius: 50,
  });

  // TODO: Decide what to display when the cluster circles are clicked / mouseovered
  // Layers for cluster functionality
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "terrorism-events",
    filter: ["has", "point_count"],
    paint: {
      // light beige, 14px circles for less than 50 incidents
      // light orange, 20px circles for greater than 50 incidents / less than 250 incidents
      // orange, 30px circles for greater than 250 incidents / less than 500 incidents
      // dark orange, 40px circles for greater or equal to 500 incidents
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#feedde",
        50,
        "#fdbe85",
        250,
        "#fd8d3c",
        500,
        "#d94701",
      ],
      "circle-radius": [
        "step",
        ["get", "point_count"],
        14,
        50,
        20,
        250,
        30,
        500,
        40,
      ],
    },
  });

  map.addLayer({
    // layer for displaying number of events in circles
    id: "cluster-count",
    type: "symbol",
    source: "terrorism-events",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  // map.addLayer({
  //   id: "unclustered-point",
  //   type: "circle",
  //   source: "terrorism-events",
  //   filter: ["!", ["has", "point_count"]],
  //   paint: {
  //     "circle-color": "#11b4da",
  //     "circle-radius": 4,
  //     "circle-stroke-width": 1,
  //     "circle-stroke-color": "#fff",
  //   },
  // });

  map.loadImage("./assets/marker.png", (error, image) => {
    if (error) throw error;
    // Add the image to the map style.
    map.addImage("marker", image);
  });

  map.addLayer({
    id: "terrorism-events-layer",
    type: "symbol",
    source: "terrorism-events",
    layout: {
      "icon-image": "marker", // reference the image
      "icon-size": 0.045,
      "icon-allow-overlap": true, // added for allowing overlapping icons which improves loading speed when zooming
      // can be omitted later
    },
    minzoom: 5, // Original icon gets displayed when the zoom level is greater than 4
  });

  map.on('click', 'terrorism-events-layer', (e) => {
    const eventProperties = e.features[0].properties;
    const readableDate = new Date(`${eventProperties.iyear}-${eventProperties.imonth}-${eventProperties.iday}`).toDateString();
    const brief = `A ${eventProperties.attacktype1_txt.toLowerCase()} in ${eventProperties.city}, ${eventProperties.country_txt} by ${eventProperties.gname}`
    const eventHTML = `<div><p>${brief}</p><p>Date: ${readableDate}</p><p>Target: ${eventProperties.target1}</p><p>Statistics: ${getStatistics(eventProperties)}</p></div>`;
    new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(eventHTML)
        .addTo(map);
  });

  function getStatistics(e) {
    const statistics = [];
    if(e.nkill > 0) {
      statistics.push(`${e.nkill} killed`);
    }
    if(e.nwound > 0) {
      statistics.push(`${e.nwound} injured`);
    }
    if(e.propextent_txt) {
      statistics.push(`${e.propextent_txt} property damage`);
    }
    if(e.nhostkid > 0) {
      statistics.push(`${e.nhostkid} hostages taken`);
    }
    if(e.ransom > 0) {
      statistics.push(`${e.ransom} ransom paid`);
    }
    return statistics.join(', ');
  }
});

function filter() {
  let yearFilter = document.getElementById("years").value;
  let deathFilter = document.getElementById("deaths").value;
  let injuryFilter = document.getElementById("injuries").value;
  let propertyFilter = document.getElementById("prop-dmg").value;
  let filterBuilder = ['all'];

  // using conditionals to build a master filter to make sure all filters are applied to feature layer
  if(yearFilter) { // if year filter is selected
    let selectedYears = yearFilter.split('-');
    filterBuilder.push(['>=', 'iyear', parseInt(selectedYears[0])]);
    filterBuilder.push(['<', 'iyear', parseInt(selectedYears[1])]);
  }
  if(deathFilter) { // if death filter is selected
    let selectedDeaths = deathFilter.split('-');
    filterBuilder.push(['>=', 'nkill', parseInt(selectedDeaths[0])]);
    if(selectedDeaths.length == 2) {
      filterBuilder.push(['<', 'nkill', parseInt(selectedDeaths[1])]);
    }
  }
  if(injuryFilter) {
    let selectedInjuries = injuryFilter.split('-');
    filterBuilder.push(['>=', 'nwound', parseInt(selectedInjuries[0])]);
    if(selectedInjuries.length == 2) {
      filterBuilder.push(['<', 'nwound', parseInt(selectedInjuries[1])]);
    }
  }
  if(propertyFilter) { // if prop damage filter is selected
    filterBuilder.push(['==', 'property', parseInt(propertyFilter)]);
  }

  if(filterBuilder.length > 1) { // if anything is being filtered
    map.setFilter('terrorism-events-layer', filterBuilder);
  } else { // if nothing is being filtered
    map.setFilter('terrorism-events-layer', null);
  }
}
