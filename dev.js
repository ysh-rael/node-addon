const ccpp = require('./ccpp')

ccpp()
    .then(() => require('./index'))
    .catch(console.log)
