// setting up variables to hold the scene geometries 
let userGeos = [];
let curGeo;

// setting up variables to assist with naming geometries 
let circleNum = 1;
let rectNum = 1;
let triNum = 1;

// a class to represent geometries 
class UserGeo{
    constructor(geo, name){
        this.geo = geo;
        this.name = name;
    }
}

// a function to find a geometry object based on its name 
// and set it as the current geometry 
function setCurGeo(name){
    for(let i = 0; i < userGeos.length; i++){
        if(userGeos[i].name == name){
            curGeo = userGeos[i];
            return;
        }
    }
}
