// -------------- edit data to modify graph start position ------------------

var data = {
  monthlyIncome: 80000,

  orgToPods: [
    { from: 'eda', to: 'teaching',     percentage: 45 },
    { from: 'eda', to: 'contingency',  percentage: 15 },
    { from: 'eda', to: 'catalyst',     percentage: 10 },
    { from: 'eda', to: 'core',         percentage: 10 },
    { from: 'eda', to: 'marketing',    percentage: 10 },
    { from: 'eda', to: 'relationship', percentage: 10 },
  ],

  podToEntity: [
    { from: 'teaching', to: 'mix',    amount: 5200 },
    { from: 'teaching', to: 'piet',   amount: 6250 },
    { from: 'teaching', to: 'joseph', amount: 5000 },
    { from: 'teaching', to: 'don',    amount: 10000 },
    { from: 'teaching', to: 'rich',   amount: 5000 },
    { from: 'teaching', to: 'TAs',    amount: 2500 },

    { from: 'relationship', to: 'jamie', amount: 5000 },
    { from: 'relationship', to: 'sarah', amount: 2500 },

    { from: 'marketing', to: 'michael',   amount: 5000 },

    { from: 'catalyst', to: 'jv',    amount: 7000 },
    { from: 'catalyst', to: 'billy', amount: 2000 },

    { from: 'contingency', to: 'contingency stuff', amount: 10000 },
    { from: 'core', to: 'core stuff',        amount: 7000 },
  ]
}

module.exports = data

