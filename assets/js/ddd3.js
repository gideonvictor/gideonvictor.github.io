


// set the dimensions and margins of the graph


var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 780 - margin.left - margin.right,
    height = 448 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// read data
d3.csv("https://gideonvictor.com/kings_20201120.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-100, 0])
    .range([ 10, width/2 ]);
  // svg.append("g")
  //   .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-50, 50])
    .range([ height, 0 ]);
  // svg.append("g")
  //   .call(d3.axisLeft(y));

  // Reformat the data: d3.hexbin() needs a specific format
  var inputForHexbinFun = []
  data.forEach(function(d) {
    inputForHexbinFun.push( [x(d.x), y(d.y)] )  // Note that we had the transform value of X and Y !
  })

  console.log(inputForHexbinFun)
    
  // Prepare a color palette
  var color = d3.scaleLinear()
      .domain([3, 15]) // Number of points in the bin?
      .range(["Transparent",  "#5D3FD3",  "#8B0000"])

  // Compute the hexbin data
  var hexbin = d3.hexbin()
    .radius(10) // size of the bin in px
    .extent([ [0, 0], [width, height] ])

  // Plot the hexbins
  svg.append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height)

  svg.append("g")
    .attr("clip-path", "url(#clip)")
    .selectAll("path")
    .data( hexbin(inputForHexbinFun) )
    .enter().append("path")
      .attr("d", hexbin.hexagon())
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("fill", function(d) { return color(d.length); })
      .attr("stroke", "black")
      .attr("stroke-width", "0")
})

d3.csv("https://gideonvictor.com/coyotes_20201120.csv", function(data) {
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ width/2, width-10]);
  // svg.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-50, 50])
    .range([ height, 0 ]);
  // svg.append("g")
  // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisLeft(y));

  // Reformat the data: d3.hexbin() needs a specific format
  var otherinputForHexbinFun = []
  data.forEach(function(d) {
    otherinputForHexbinFun.push( [x(d.x), y(d.y)] )  // Note that we had the transform value of X and Y !
  })

  // Prepare a color palette
  var color = d3.scaleLinear()
      .domain([3, 15]) // Number of points in the bin?
      .range(["Transparent",  "#8B0000"])

  // Compute the hexbin data
  var hexbin = d3.hexbin()
    .radius(10) // size of the bin in px
    .extent([ [0, 0], [width, height] ])


  // Plot the hexbins
  svg.append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height)

  svg.append("g")
    .attr("clip-path", "url(#clip)")
    .selectAll("path")
    .data( hexbin(otherinputForHexbinFun) )
    .enter().append("path")
      .attr("d", hexbin.hexagon())
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("fill", function(d) { return color(d.length); })
      .attr("stroke", "black")
      .attr("stroke-width", "0")
})
