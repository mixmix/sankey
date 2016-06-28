var data = require('./startingData')
var mapDataToSankeyFormat = require('./utils/mapDataToSankeyFormat')
var render = require('./utils/render')

var initialMonthlyIncome = data.monthlyIncome

document.addEventListener('DOMContentLoaded', function(ev) {
  var input = document.getElementById('incoming-money')
  input.value = data.monthlyIncome 
  redraw()
    
  input.addEventListener('keyup', function(ev) {
    if (isNaN(input.valueAsNumber)) input.value = initialMonthlyIncome
    data.monthlyIncome = input.valueAsNumber
    redraw()
  })

  document.addEventListener('keyup', function(ev) { 
    switch (ev.keyCode) {
      case 38 :
        console.log('up')
        ev.preventDefault()
        console.log(input.valueAsNumber + 5000, input.valueAsNumber)
        input.value = input.valueAsNumber + 5000
      case 40 :
        ev.preventDefault()
        input.value = input.valueAsNumber - 5000
    }
  })
  
})

var redraw = function() {
  console.log('drawing')
  var sankeyData = mapDataToSankeyFormat(data) 
  document.getElementById("chart").innerHTML = ''
  render(sankeyData)
}

