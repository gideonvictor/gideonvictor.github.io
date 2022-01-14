
// set the dimensions and margins of the graph
var margin = {top: -35, right: 20, bottom: -50, left: -6},
    width = 990 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    raddd = 20
    minnn = 0
    maxxx = 3
    ;

    // var raddd = 10; // You better declare this var outside the event handler function if you want to use it else where
    //
    // $("#slider").on("change",function(){
    //     raddd = $(this).val();
    //     console.log(raddd)
    // });

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// read data
d3.csv("https://gideonvictor.com/Kings.csv", function(data) {

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

  // Prepare a color palette
  var color = d3.scaleLinear()
      .domain([minnn, maxxx]) // Number of points in the bin?
      .range(["Transparent",  "#572A84"])

  // Compute the hexbin data
  var hexbin = d3.hexbin()
    .radius(raddd) // size of the bin in px
    .extent([ [0, 0], [width, height] ])

  // Plot the hexbins
  svg.append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height)
console.log(inputForHexbinFun)
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

d3.csv("https://gideonvictor.com/Opponent.csv", function(data) {
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([ width/2, width]);
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
      .domain([minnn, maxxx]) // Number of points in the bin?
      .range(["Transparent",  "#0033a0"])

  // Compute the hexbin data
  var hexbin = d3.hexbin()
    .radius(raddd) // size of the bin in px
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
