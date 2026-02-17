import MapboxGeocoder from "https://esm.sh/@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = "pk.eyJ1IjoiZGphbWVzYSIsImEiOiJjbWtjamxpZmMwMWt6M2NzZnp5djd0bDMwIn0.Scv5Lmteq9Io3P15nw1qpA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/djamesa/cml5qgdt4001g01s439bhh3cc",
  center: [-0.1, 51.51],
  zoom: 10
});

map.on("mousemove", (event) => {
  const borough = map.queryRenderedFeatures(event.point, {
    layers: ["london_boroughs"]
  });
  document.getElementById("lb").innerHTML = borough.length
    ? `<h3>${borough[0].properties.name}</h3><p>LGBTQ+ population (%):
<strong>${borough[0].properties.percentage}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
});

map.on("load", () => {
  const layers = [
    "2",
    "4",
    "6",
    "8",
    "10",
    "12"
  ];
  const colors = [
    "#feebe2",
    "#fcc5c0",
    "#fa9fb5",
    "#f768a1",
    "#c51b8a",
    "#7a0177"
  ];

  const legend = document.getElementById("legend");
});

map.on("load", () => {
   
  map.setPaintProperty('london_boroughs', 'fill-outline-color', [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    '#ffffff',
    '#4d0033'
  ]);

  map.setPaintProperty('london_boroughs', 'fill-opacity', [
    'case',
    ['boolean', ['feature-state', 'hover'], false],
    0.8,
    0.5
  ]);
  
  let hoveredBoroughId = null;

map.on('mousemove', 'london_boroughs', (e) => {
  if (!e.features.length) return;

  const borough_name = e.features[0].properties.name;
  
    map.setFilter('borough_highlight', [
    '==',
    'name',
    borough_name
  ]);
});

map.on('mouseleave', 'london_boroughs', () => {
  map.setFilter('borough_highlight', ['==', 'name', '']);
});

map.addLayer({
  id: 'borough_highlight',
  type: 'line',
  source: 'composite',
  'source-layer': 'london_data2-7ynfg3',
  paint: {
    'line-color': '#c51b8a',
    'line-width': 2.5
  },
  filter: ['==', 'name', '']
});
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: false,
  placeholder: "Search for places in London",
  proximity: {
    longitude: -0.1,
    latitude: 51.5
  }
});
map.addControl(geocoder, "top-left");

map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);

map.on('click', (event) => {
 const features = map.queryRenderedFeatures(event.point, {
 layers: ['lgbt_venues']
 });
 if (!features.length) {
 return;
 }
 const feature = features[0];
 const popup = new mapboxgl.Popup({ offset: [0, -15]})
 .setLngLat(feature.geometry.coordinates)
 .setHTML(
 `<h5>${feature.properties.name}</h5>
 <h4>Address: ${feature.properties.address1}</h4>
 <h4>Postcode: ${feature.properties.postcode}</h4>
 <h4><a href="${feature.properties.website}" target="_blank" rel="noopener">
      Visit site
    </a></h4>`
 )
 .addTo(map);
});