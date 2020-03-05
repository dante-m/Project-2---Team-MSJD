var html = d3.select('html').style('background-color', 'grey')

var body = d3.select('body').style('background-color', 'grey')

d3.json('/mlb_data').then(json => console.log(json));

var width = parseInt(d3.select("#graph_1").style("width"));

var height = width - width / 3.9;

var margin = 20;

var labelArea = 110;

var tPadBot = 40;
var tPadLeft = 40;

var graph_1 = d3
  .select("#graph_1")
  .append("svg")
  .style('background-color', 'cyan')
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var graph_1_title = d3
    .select('#graph_1_title')
    .append('h3')
    .text('Graph 1 Title')

var graph_1_description = d3
    .select('#graph_1_description')
    .append('p')
    .text('This is where you talk about what you want talk about.')

var graph_2 = d3
.select("#graph_2")
.append("svg")
.style('background-color', 'magenta')
.attr("width", width)
.attr("height", height)
.attr("class", "chart");

var graph_2_title = d3
    .select('#graph_2_title')
    .append('h3')
    .text('Graph 2 Title')

var graph_2_description = d3
    .select('#graph_2_description')
    .append('p')
    .text('This is where you talk about what you want talk about.')

var graph_3 = d3
.select("#graph_3")
.append("svg")
.style('background-color', 'pink')
.attr("width", width)
.attr("height", height)
.attr("class", "chart");

var graph_3_title = d3
.select('#graph_3_title')
.append('h3')
.text('Graph 3 Title')

var graph_3_description = d3
.select('#graph_3_description')
.append('p')
.text('This is where you talk about what you want talk about.')