const Tarea = require("./tarea");

class Tareas {

    _list = {};
    
    constructor(){
        this._list = {};
    }

    deleteTarea( id = ''){
        if( this._list[id] ) {
            delete this._list[id];
        }
    }

    get listArr(){
        const listArray=[];
        Object.keys(this._list).forEach( key  => listArray.push(this._list[key]));
        return listArray;
    }

    loadTarea(tareas = []){
        tareas.forEach(tarea => {
            this._list[tarea.id]=tarea;
        })
    }

    addTarea( desc=''){
        const tarea = new Tarea(desc);
        this._list[tarea.id] = tarea;
    }

    renderAllTareas(){
        console.log();
        this.listArr.forEach((tarea,i)=>{
            const idx = i + 1;
            console.log(`${idx}. ${tarea.desc} :: ${(tarea.completeOn)?tarea.completeOn.green:'Pendiente'.red}`);
        })

    }

    renderPendingCompleteTarea(complete=true){
        console.log();
        let idx=0;
        this.listArr.forEach((tarea,i)=>{
            if(complete){
                if(tarea.completeOn){
                    idx++;
                    console.log(`${idx}. ${tarea.desc} :: `+`${ tarea.completeOn }`.green);
                }
            }else{
                if(!tarea.completeOn){
                    idx++;
                    console.log(`${idx}. ${tarea.desc} :: Pendiente`.red);
                }
            }
        })

    }

    completeTareaToggle( ids = []){
        ids.forEach( id => {
            const tarea = this._list[id];
            if(!tarea.completeOn) {
                tarea.completeOn = new Date().toISOString()
            }
        })
        this.listArr.forEach((tarea,i)=>{
            if(!ids.includes(tarea.id))
                tarea.completeOn = null;
        })

    }

}

module.exports = Tareas; 