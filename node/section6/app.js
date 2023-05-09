require('dotenv').config();
require('colors');

const { inquirerMenu, pause, readInput,  confirm, menuComplete, lugaresListado } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() =>{
    
    busquedas = new Busquedas();
    do {

        opt = await inquirerMenu();

        switch (opt ){
            case 1:
                //Mostrar mensaje
                const lugar = await readInput('Ciudad: ');
                
                //Buscar lugares
                const lugares = await busquedas.ciudad(lugar);
                const idLugar = await lugaresListado(lugares);

                if(idLugar == 0) 
                    continue;

                //Seleccionar el lugar
                const lugarSeleccionado=lugares.find( l => l.id === idLugar);

                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                //Clima
                const clima = await busquedas.clima(lugarSeleccionado.lat, lugarSeleccionado.lng);
                
                //Mostrar resultados
                console.log('\nInformación de la ciudad:'.green);
                console.log('Ciudad: ' , lugarSeleccionado.nombre);
                console.log('Lat:' , lugarSeleccionado.lat);
                console.log('Lng:' , lugarSeleccionado.lng);
                console.log(`Temperatura:`, clima.temp);
                console.log('Min:',clima.min);
                console.log('Max:',clima.max);
                console.log('Como esta el clima:',clima.desc);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach( lugar => {
                    console.log(lugar);
                })
                break;
        }

        if(opt!==0)
            await pause();

    } while ( opt !== 0)
}

main();