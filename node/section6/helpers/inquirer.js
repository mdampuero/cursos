const inquirer = require('inquirer');
require('colors');

const questions=[
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: '1. Buscar ciudad'
            },
            {
                value: 2,
                name: '2. Historial'
            },
            {
                value: 0,
                name: '0. Salir'
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log("=========================".green);
    console.log("==Seleccione una opción==".rainbow);
    console.log("=========================".green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {

    const question = {
        type: 'input',
        name: 'enter',
        message: `Presion ${ 'ENTER'.green } para continuar`,
    }
    
    console.log('\n')
    await inquirer.prompt(question);

}

const readInput = async(message) => {

    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length === 0){
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }
    
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const lugaresListado = async(lugares = []) => {
    const choices = lugares.map( (lugar,i) => {
        const idx = `${ i + 1}`
        return {
            value: lugar.id,
            name: `${ idx }. ${ lugar.nombre }`
        }
    });

    

    choices.unshift({
        value: '0',
        name : '0. Cancelar'
    })

    const preguntas =[
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const menuComplete = async(tareas = []) => {
    const choices = tareas.map( (tarea,i) => {

        const idx = `${ i + 1}`
        return {
            value: tarea.id,
            name: `${ idx }. ${ tarea.desc }`,
            checked: (tarea.completeOn)
        }
    });

    const preguntas =[
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Completar',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

const confirm = async(message) => {

    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }
    
    const { ok } = await inquirer.prompt(question);
    return ok;
}
module.exports = { 
    inquirerMenu ,
    pause,
    readInput,
    lugaresListado,
    confirm,
    menuComplete
}