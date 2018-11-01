// PUERTO
process.env.PORT = process.env.PORT || 3000;


//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BASE DE DATOS
let urlDB;

if( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/api-landing'
}else{
    urlDB = "mongodb://admin:root2018@ds237922.mlab.com:37922/api-landing";
}

process.env.URLDB = urlDB;
