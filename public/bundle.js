(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var data = require('./startingData')
var mapDataToSankeyFormat = require('./utils/mapDataToSankeyFormat')
var render = require('./utils/render')

var initialMonthlyIncome = data.monthlyIncome

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault()
  }
})

document.addEventListener('DOMContentLoaded', function(e) {
  var input = document.getElementById('incoming-money')
  input.value = data.monthlyIncome 
  redraw()
    
  input.addEventListener('keyup', function(e) {
    if (isNaN(input.valueAsNumber)) input.value = initialMonthlyIncome
    data.monthlyIncome = input.valueAsNumber
    redraw()
  })

  document.addEventListener('keydown', function(e) { 
    var value    = input.valueAsNumber
    var newValue = input.valueAsNumber

    if (e.keyCode == 38) {
      newValue += 5000
    } else if (e.keyCode == 40) {
      newValue -= 5000
    }

    data.monthlyIncome = newValue
    input.value = newValue
    redraw()
  })
  
})

var redraw = function() {
  var sankeyData = mapDataToSankeyFormat(data) 
  document.getElementById("chart").innerHTML = ''
  render(sankeyData)
}


},{"./startingData":2,"./utils/mapDataToSankeyFormat":3,"./utils/render":4}],2:[function(require,module,exports){
// -------------- edit data to modify graph start position ------------------

var data = {
  monthlyIncome: 120000,

  orgToPods: [
    { from: 'bootcamp', to: 'teaching',     percentage: 45 },
    { from: 'bootcamp', to: 'contingency',  percentage: 15 },
    { from: 'bootcamp', to: 'catalyst',     percentage: 10 },
    { from: 'bootcamp', to: 'core',         percentage: 10 },
    { from: 'bootcamp', to: 'marketing',    percentage: 10 },
    { from: 'bootcamp', to: 'relationship', percentage: 10 },
  ],

  podToEntity: [
    { from: 'teaching', to: 'mix',    amount: 5000 },
    { from: 'teaching', to: 'piet',   amount: 6250 },
    { from: 'teaching', to: 'joseph', amount: 5000 },
    { from: 'teaching', to: 'TAs',    amount: 2500 },
    { from: 'teaching', to: 'sarrah',  amount: 1930 },

    { from: 'teaching', to: 'don',    amount: 10000 },
    { from: 'teaching', to: 'rich',   amount: 6666 },
    { from: 'teaching', to: 'tony',   amount: 5000 },
    { from: 'teaching', to: 'juliet',  amount: 3000 },
    { from: 'teaching', to: 'kristina',  amount: 1000 },

    { from: 'relationship', to: 'rohan', amount: 8000 },
    { from: 'relationship', to: 'jamie', amount: 8000 },
    { from: 'relationship', to: 'es',    amount: 4000 },

    { from: 'marketing', to: 'mike',  amount: 4000 },
    { from: 'marketing', to: 'moly',  amount: 1275 },
    { from: 'marketing', to: 'beka',  amount: 2550 },
    { from: 'marketing', to: 'antz',  amount: 2125 },
    { from: 'marketing', to: 'charlotte',  amount: 1275 },

    { from: 'catalyst', to: 'jv',    amount: 4000 },
    { from: 'catalyst', to: 'billy', amount: 3000 },
    { from: 'catalyst', to: 'susan', amount: 2000 },
    { from: 'catalyst', to: 'silvia', amount: 2500 },


    // this is made up so graph draws right

    { from: 'contingency', to: 'contingency stuff', amount: 10000 },

    { from: 'core', to: 'core stuff', amount: 7000 },

    // 

    { from: 'placements', to: 'relationship', amount: 1 },
    // ideally
    //{ from: 'placements', to: 'relationship', amount: 10500 },
  ]
}

module.exports = data


},{}],3:[function(require,module,exports){

var mapDataToSankeyFormat = function(inputData) {
  var monthlyIncome = inputData.monthlyIncome
  var orgToPods = inputData.orgToPods
  var podToEntity = inputData.podToEntity
  var data = {}  

  // fudge is needed while data.nodes is built just from 'to' fields

  var fudge = [{to: 'bootcamp'}, {to: 'placements'}]

  data.nodes = fudge.concat(orgToPods).concat(podToEntity)
    .map( function(el) { return el.to } )
    .reduce( function(prev, curr) {
        if (prev.indexOf(curr) == -1) return prev.concat(curr)
        return prev
      },
      []
    )
    .map( function(name) {
      return {name: name}
    })

  data.links = orgToPods.map( function(entry) {
      return {
        source: entry.from,
        target: entry.to,
        value:  entry.percentage/100.0*monthlyIncome
      }
    })
    .concat( podToEntity.map(function(entry) {
      return {
        source: entry.from,
        target: entry.to,
        value:  entry.amount
      }
    }))

  return data
}

module.exports = mapDataToSankeyFormat


},{}],4:[function(require,module,exports){
var render = function(data) {
  var units = "$";
   
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 1200 - margin.left - margin.right,
      height = 900 - margin.top - margin.bottom;
   
  var formatNumber = d3.format(",.0f"),    // zero decimal places
      format = function(d) { return units + " " + formatNumber(d) },
      color = d3.scale.category20();
   
  // append the svg canvas to the page
  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
  // Set the sankey diagram properties
  var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(10)
    .size([width, height])
   
  var path = sankey.link();
   
  // load the data
  var graph = data
 
  var nodeMap = {};
  graph.nodes.forEach(function(x) { nodeMap[x.name] = x; })
  graph.links = graph.links.map(function(x) {
    return {
      source: nodeMap[x.source],
      target: nodeMap[x.target],
      value: x.value
    }
  })
 
  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);
 
// add in the links
  var link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    .sort(function(a, b) { return b.dy - a.dy; });
 
// add the link titles
  link.append("title")
    .text(function(d) {
      return d.source.name + " → " + d.target.name + "\n" + format(d.value)
    })
 
// add in the nodes
  var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"
    })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
        this.parentNode.appendChild(this)
      })
      .on("drag", dragmove)
    )
 
// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
        return d.color = color(d.name.replace(/ .*/, ""))
      })
      .style("stroke", function(d) { 
        return d3.rgb(d.color).darker(2)
      })
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + format(d.value)
      })
 
// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
 
// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + (
             d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
          ) + "," + (
                   d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
}

module.exports = render


},{}]},{},[1]);
