
const fs = require('fs');
require('colors'); 
const crearArchivo = async (base=5,listar=false, hasta) =>{

    try{
        
        let salida ='';
        let fileName=`./output/tabla-${ base }.txt`;
        for(let i=1; i<=hasta; i++){
            salida+=`${ base } x ${ i } = ${ base*i }\n`;
        }

        if(listar){
            console.log("==============".green);
            console.log(`    Tabla ${ base }`.rainbow)
            console.log("==============".green);
            console.log(salida.rainbow);
        }

        fs.writeFileSync(fileName,salida);
        return fileName;
    } catch ( err ){
        throw err  
    }
    
}

module.exports = {
    crearArchivo
}