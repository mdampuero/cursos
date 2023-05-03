require('colors');

const { inquirerMenu, pause, readInput, menuDelete, confirm, menuComplete } = require('./helpers/inquirer');
const { save,read } = require('./helpers/saveDB');
const Tareas = require('./models/tareas');

const main = async() =>{
    
    let opt='';
    const tareas = new Tareas();

    const tareasDB = read();    
    
    if(tareasDB){
        tareas.loadTarea(tareasDB);
    }

    do {

        opt = await inquirerMenu();

        switch (opt ){
            case '1':
                const desc = await readInput('Ingrese la Tarea:');
                tareas.addTarea(desc);
                break;
            case '2':
                tareas.renderAllTareas()
                break;
            case '3':
                tareas.renderPendingCompleteTarea(true);
                break;
            case '4':
                tareas.renderPendingCompleteTarea(false);
                break;
            case '5':
                const ids = await menuComplete(tareas.listArr);
                tareas.completeTareaToggle(ids);
                continue;
                break;
            case '6':
                const id = await menuDelete(tareas.listArr);
                if( id == '0') continue
                const ok = await confirm('¿Esta seguro que desea eliminar esta tarea?');
                if(ok){
                    delete tareas.deleteTarea(id);
                    console.log("Tarea borrada");
                }
                break;
        }

        save(tareas.listArr);

        if(opt!=='0')
            await pause();

    } while ( opt !== '0')
}

main();