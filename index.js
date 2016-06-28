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

