const { log } = require('console');
const fs = require('fs');

const file = './db/database.json';

const save = (data) => {

    fs.writeFileSync(file,JSON.stringify(data));

}

const read = () => {

    if(!fs.existsSync(file)){
        return null;
    }

    const dataJson =  JSON.parse(fs.readFileSync(file,'utf-8'));
    return dataJson;
}


module.exports = {
    save,
    read
}