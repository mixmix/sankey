// -------------- edit data to modify graph ------------------

var monthlyIncome = 80000

var orgToPods = [
  { from: 'eda', to: 'teaching',     percentage: 45 },
  { from: 'eda', to: 'relationship', percentage: 20 },
  { from: 'eda', to: 'marketing',    percentage: 25 },
  { from: 'eda', to: 'catalyst',     percentage: 10 },
]

var podToEntity = [
  { from: 'teaching', to: 'mix',    amount: 5200 },
  { from: 'teaching', to: 'piet',   amount: 6250 },
  { from: 'teaching', to: 'joseph', amount: 5000 },
  { from: 'teaching', to: 'don',    amount: 10000 },
  { from: 'teaching', to: 'rich',   amount: 5000 },

  { from: 'relationship', to: 'jamie', amount: 5000 },
  { from: 'relationship', to: 'sarah', amount: 2500 },

  { from: 'marketing', to: 'michael',   amount: 5000 },

  { from: 'catalyst', to: 'jv',    amount: 7000 },
  { from: 'catalyst', to: 'billy', amount: 2000 },
]

// ------------- generats data.json -----------------------------

var path = require('path')
var fs = require('fs')

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

fs.writeFile( path.join(__dirname, 'public', 'data.json'), JSON.stringify(data, null, 2), function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('successfuly wrote data.json')
  }
})
