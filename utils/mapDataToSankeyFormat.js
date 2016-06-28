
var mapDataToSankeyFormat = function(inputData) {
  var monthlyIncome = inputData.monthlyIncome
  var orgToPods = inputData.orgToPods
  var podToEntity = inputData.podToEntity
  var data = {}  

  data.nodes = [{to: 'eda'}].concat(orgToPods).concat(podToEntity)
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

