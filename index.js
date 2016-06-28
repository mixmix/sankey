var data = require('./startingData')
var mapDataToSankeyFormat = require('./utils/mapDataToSankeyFormat')
var render = require('./utils/render')

document.addEventListener('DOMContentLoaded', function(ev) {
  var sankeyData = mapDataToSankeyFormat(data) 
  render(sankeyData)
})

