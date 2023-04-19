
const { crearArchivo } = require('./helpers/multiplicar')
const argv  = require('./config/yargs')
require('colors'); 

console.clear();

crearArchivo(argv.b,argv.l,argv.h)
    .then( fileName => console.log(fileName.blue,'creado'.blue))
    .catch( err => console.log(err))


