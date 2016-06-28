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
    { from: 'teaching', to: 'mix',    amount: 5200 },
    { from: 'teaching', to: 'piet',   amount: 6250 },
    { from: 'teaching', to: 'joseph', amount: 5000 },
    { from: 'teaching', to: 'don',    amount: 10000 },
    { from: 'teaching', to: 'rich',   amount: 5000 },
    { from: 'teaching', to: 'TAs',    amount: 2500 },
    { from: 'teaching', to: 'sarrah',  amount: 1930 },

    { from: 'relationship', to: 'rohan', amount: 8000 },
    { from: 'relationship', to: 'jamie', amount: 8000 },

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
    { from: 'core', to: 'core stuff',        amount: 7000 },

    // 

    { from: 'placements', to: 'relationship', amount: 10500 },
  ]
}

module.exports = data

