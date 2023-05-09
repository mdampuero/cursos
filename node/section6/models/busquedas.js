
const axios = require('axios');
const fs = require('fs');

class Busquedas {

    historial = [];
    pathDB = './db/database.json'

    constructor(){
        this.read()
    }

    get historialCapitalizado(){
        
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ')
        })
    }
    getParamsMapbox ( lugar ) {
        return {
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params :{
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'language': 'es'
            }
        }    
    }

    getParamsOpenWeather () {
        return {
            'units': 'metric',
            'lang': 'es',
            'appid': process.env.OPENWEATHER_KEY
        }
    }

    async ciudad (lugar =''){
    
        try{
            const instance = axios.create(this.getParamsMapbox( lugar ));
            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        }catch (err){
            console.log(err);
        }
        
    }

    async clima (lat = '', lon = ''){
    
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params : {...this.getParamsOpenWeather(),lat,lon}
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                'desc': weather[0].description,
                'min': main.temp_min,
                'max': main.temp_max,
                'temp': main.temp
            }
            
        }catch (err){
            console.log(err);
        }
        
    }

    agregarHistorial( lugar = '' ){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial=this.historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.save();
    } 

    save(){

        fs.writeFileSync(this.pathDB,JSON.stringify(this.historial));
    
    }
    
    read(){
    
        if(!fs.existsSync(this.pathDB)){
            return null;
        }
    
        this.historial =  JSON.parse(fs.readFileSync(this.pathDB,'utf-8'));
        return ;
    }

}

module.exports = Busquedas