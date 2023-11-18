const mongoose = require('mongoose');

// Importacion automatica debido a que el objeto config esta siendo exportado como un modulo global
const { dbUsername, dbPassword } = require('.');

// Conectar con la base de datos mediante URI
const connect = async () => {
    const connection = await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@foodmoviescluster.jrxbqju.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Se ha conectado correctamente', connection.connection.host);
}

module.exports = connect
/* const mongoose = require('mongoose')
const { dbUsername, dbPassword } = require('.')

const connect = async ()=>{
    const connection = await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@ucamp.px9y8d2.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Se ha conectado correctamente:', connection.connection.host)
}

module.exports = connect */