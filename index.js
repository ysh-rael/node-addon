
const addon = require('./addon.node')
const fs = require('fs')
fs.writeFileSync('arquivoCriado.txt', addon.hello())

console.log(addon.hello())

