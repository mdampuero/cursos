const argv = require('yargs')
    .option('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base para multiplicar'

    })
    .option('h',{
        alias: 'hasta',
        type: 'number',
        default:10,
        describe: 'Es el límite'

    })
    .option('l',{
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'Muestra los resultados por pantalla'
    })
    .check((argv,options)=>{
        if( isNaN(argv.b) ){
            throw 'La base debe ser un número'
        } 
        return true;
    })
    .argv;

    module.exports = argv;