const mongoose = require('mongoose');

//Definicion del esquema peliculas
const movieSchema = new mongoose.Schema({
    nombre: String,
    genero: String,
    año: Number,
    director: String
});

//Compilar nuestro schema dentro del modelo
const Movie = mongoose.model('movies', movieSchema)

module.exports = Movie 