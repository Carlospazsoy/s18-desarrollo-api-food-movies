const { Router } = require("express");
const Movie = require('../models/movie')

function movies(app) {
  let arreglo_peliculas = [];
  //Creacion del router y asignacion de ruta
  const router = Router();
  app.use("/api/movies", router);

  //Definicion de metodos
  router.get("/", (req, res) => {
    return res.json(arreglo_peliculas);
  });

  router.post("/", (req, res) => {
    const newMovie = req.body;
    arreglo_peliculas.push(newMovie);
    console.log(arreglo_peliculas);
    return res.json({
      success: true,
      mensaje: "Pelicula agregada con éxito",
    });
  });

  router.put("/:name", (req, res) => {
    const name = req.params.name;
    const newGenre = req.body.genero;

    const pelicula_identificada = arreglo_peliculas.find(
      (movie) => movie.nombre === name
    );

    if (!pelicula_identificada) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    console.log(
      "ContentType de pelicula_identificada:",
      typeof pelicula_identificada
    );

    pelicula_identificada.genero = newGenre;

    return res.json({
      mensaje: "Género de la película modificado exitosamente",
      pelicula: pelicula_identificada,
    });
  });

  router.patch("/:name", (req, res) => {
    const name = req.params.name;
    const updatedFields = req.body; // Contiene los campos que se desean actualizar

    // Identificar la película por nombre
    const pelicula_identificada = arreglo_peliculas.find((movie) => movie.nombre === name);

    if (!pelicula_identificada) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    // Actualizar los campos especificados en updatedFields
    for (const key in updatedFields) {
			// si el cuerpo del request posee un key, este se iguala con el key del cuerpo de la pelicula identificada
      if (updatedFields.hasOwnProperty(key)) {
        pelicula_identificada[key] = updatedFields[key];
      }
    }
			// Devolver la película modificada
    return res.json({
      mensaje: "Información de la película modificada exitosamente",
      pelicula: pelicula_identificada,
    });
  });

  router.delete("/:name", (req, res) => {
    const name = req.params.name;
    // Utiliza !== para verificar que el nombre no sea igual
    arreglo_peliculas = arreglo_peliculas.filter(
      (movie) => movie.nombre !== name
    );
    console.log(arreglo_peliculas);
    return res.json({
      mensaje: "Pelicula eliminada con exito",
      success: true,
    });
  });
}

module.exports = movies;

/* 
    router.get('/', async function (req, res){
        const movies = await Movie.find()
        console.log(movies)
        return res.json(movies)
    })

    router.post('/', async (req, res)=>{
        const newDish = req.body
        const movie = await Movie.create(newDish)
        console.log(movie)

        return res.json({
            success: true,
            message:'Platillo agregado correctamente'
        })
    })
    
    router.put('/:indice', async (req, res)=>{
        const indice = req.params.indice
        const updatedDish = req.body
        
        const movie = await Movie.findByIdAndUpdate(indice, updatedDish, {new:true})
        console.log(movie)

        return res.json({
            success: true,
            message:'Platillo editado correctamente'
        })
    })

    router.delete('/:indice', async (req, res)=>{
        const indice = req.params.indice
        
        const movie = await Movie.findByIdAndDelete(indice)

        console.log(movie)

        return res.json({
            success: true,
            message:'Platillo eliminado correctamente'
        })
    }) */
