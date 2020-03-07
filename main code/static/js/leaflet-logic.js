// Pull info from Data js
var locations = [{
    team:"Los Angeles Angels of Anaheim",address:"2000 Gene Autry Way, Anaheim, CA. 92806",lat:33.799572,lng:-117.889031},
    {team:"Arizona Diamondbacks",address:"P.O. Box 2095, Phoenix, AZ. 85001",lat:33.452922,lng:-112.038669},
    {team:"Atlanta Braves",address:"P.O. Box 4064, Atlanta, GA. 30302",lat:33.74691,lng:-84.391239},
    {team:"Baltimore Orioles",address:"333 W. Camden Street, Baltimore, MD. 21201",lat:39.285243,lng:-76.620103},
    {team:"Boston Red Sox",address:"4 Yawkey Way, Boston, MA 02215",lat:42.346613,lng:-71.098817},
    {team:"Chicago Cubs",address:"1060 Addison Street, Chicago, IL 60616",lat:41.947201,lng:-87.656413},
    {team:"Chicago White Sox",address:"333 W. 35th Street, Chicago, IL 60616",lat:41.830883,lng:-87.635083},
    {team:"Cincinnati Reds",address:"100 Cinergy Field, Cincinnati, OH 45202",lat:39.107183,lng:-84.507713},
    {team:"Cleveland Indians",address:"2401 Ontario Street, Cleveland, OH 44115",lat:41.495149,lng:-81.68709},
    {team:"Colorado Rockies",address:"Coors Field, 2001 Blake Street, Denver, CO 80205-2000",lat:39.75698,lng:-104.965329},
    {team:"Detroit Tigers",address:"Comerica Park, 2100 Woodward Ave., Detroit, MI 48201",lat:42.346354,lng:-83.059619},
    {team:"Miami Marlins",address:"2269 NW 199th Street, Miami, FL 33056",lat:25.954428,lng:-80.238164},
    {team:"Houston Astros",address:"P.O. Box 288, Houston, TX 77001-0288",lat:29.76045,lng:-95.369784},
    {team:"Kansas City Royals",address:"P.O. Boz 419969, Kansas City, MO 64141",lat:39.10222,lng:-94.583559},
    {team:"Los Angeles Dodgers",address:"1000 Elysian Park Ave., Los Angeles, CA 90012",lat:34.072437,lng:-118.246879},
    {team:"Milwaukee Brewers",address:"P.O. Box 3099, Milwaukee, WI 53201-3099",lat:43.04205,lng:-87.905599},
    {team:"Minnesota Twins",address:"501 Chicago Ave. S., Minneapolis, MN 55415",lat:44.974346,lng:-93.259616},
    {team:"Washington Nationals",address:"1500 South Capitol Street SE, Washington, DC",lat:38.87,lng:-77.01},
    {team:"New York Mets",address:"Roosevelt Ave & 126th Street, New York, NY 11368",lat:40.75535,lng:-73.843219},
    {team:"New York Yankees",address:"Yankee Stadium, E. 161 Street & River Ave., New York, NY 10451",lat:40.819782,lng:-73.929939},
    {team:"Oakland Athletics",address:"Oakland Coliseum, 700 Coliseum Way, Oakland, Ca 94621-1918",lat:37.74923,lng:-122.196487},
    {team:"Philadelphia Phillies",address:"P.O. Box 7575, Philadelphia, PA 19101",lat:39.952313,lng:-75.162392},
    {team:"Pittsburgh Pirates",address:"600 Stadium Circle, Pittsburgh, PA 15212",lat:40.461503,lng:-80.008924},
    {team:"St. Louis Cardinals",address:"250 Stadium Plaza, St. Louis, MO 63102",lat:38.629683,lng:-90.188247},
    {team:"San Diego Padres",address:"P.O. Box 2000, San Diego, CA 92112-2000",lat:32.752148,lng:-117.143635},
    {team:"San Francisco Giants",address:"Pacific Bell Park, 24 Willie Mays Plaza, San Francisco, CA 94107",lat:37.77987,lng:-122.389754},
    {team:"Seattle Mariners",address:"P.O. Box 41000, 411 First Ave. S., Seattle, WA 98104",lat:47.60174,lng:-122.330829},
    {team:"Tampa Bay Rays",address:"1 Tropicana Drive, St. Petersburg, FL 33705",lat:27.768487,lng:-82.648191},
    {team:"Texas Rangers",address:"1000 Ballpark Way, Arlington, TX 76011",lat:32.750156,lng:-97.081117},
    {team:"Toronto Blue Jays",address:"1 Blue Jay Way, Suite 3200, Toronto, ONT M5V 1J1",lat:43.641653,lng:-79.3917}]
// Create lists for our layers
var stadiumMarkers = []
var attendanceMarkers = []
  
  // Loop through locations and create markers for each part
  for (var i = 0; i < locations.length; i++) {
    stadiumMarkers.push(
        L.marker([locations[i].lat, locations[i].lng]).bindPopup("<h1>" + locations[i].team + "</h1>")
    )}
  // Define variables for our base layers
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  
  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
  });
  
  

d3.csv("static/baseballdata.csv").then(function(ballData) {
// Define yearChanger function
    function yearChanger({label, value, map}){
      if (attend != null){
        attend.forEach(data => {
          layerGroup.removeLayer(data)
        })
      }
      // Define filter function
      function selectYear(filteredData) {
        if (filteredData.Year == label){
        return filteredData}}
      //Define the function to size the circles
      function circleSize(swings) {
        return swings * .00002;
      }
      var selectedData = ballData.filter(selectYear)
      
      // Use a for each to create the circles
      for (var i = 0; i < selectedData.length; i++) {
        var latlng = [];
        locations.forEach(data => {
          if (data.team == selectedData[i].current){
            var lat = data.lat
            var lng = data.lng
            latlng.push(lat, lng)
          }

        })
        console.log(latlng)
        attendanceMarkers.push(
          L.circleMarker(latlng,{
            stroke: true,
            fillOpacity: 0.75,
            color: "black",
            fillColor: "red",
            radius: circleSize(selectedData[i].Attendance *.3) 
          }).bindPopup("<h1>" + selectedData[i].current + "</h1> <hr> <h3>" 
          + selectedData[i].Attendance + " Attendance</h3"))
      // console.log(attendanceMarkers)
    }
      var attend = L.layerGroup(attendanceMarkers);
    attend.addTo(myMap)}
  // Add a timeline layer of control to the map
  L.control.timelineSlider({
    position: "bottomleft",
    timelineItems: ["2010","2011","2012","2013","2014", "2015", "2016"] ,
    changeMap: yearChanger,
    initializeChange: true
  })
  .addTo(myMap);
}).catch(function(error) {
  console.log(error);
});

// console.log(attendanceMarkers)
// Create layer group for stadiums
var stadiums = L.layerGroup(stadiumMarkers);
var attend = L.layerGroup(attendanceMarkers);
// Create a baseMaps object
var baseMaps = {
  "Light Map": lightmap,
  "Satellite Map": satellitemap
};

// Create an overlay object
var overlayMaps = {
  "Stadiums": stadiums
  //  
};

// Define a map object
var myMap = L.map("map", {
  center: [37.960666, -95.715244],
  zoom: 4,
  layers: [lightmap, stadiums]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);