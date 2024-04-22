const isWindows = process.platform === 'win32';
const addon = require(isWindows ? './build/Release/addon.node' : './addon.node')

const SEPARATOR = '---------\n'
console.log(SEPARATOR)

console.log('Olá mundo! Eu sou o Node.js')
console.log(SEPARATOR)

console.log('Irei chamar meu amigo...')
console.log(SEPARATOR)

console.log(addon.hello())
console.log(SEPARATOR)

