const { Router } = require("express");

// Importaciion atmatica al escribir await Movie
const Movie = require('../models/movie')

function movies(app) {
  /* let arreglo_peliculas = []; nos sirvio antes de configurar la DB real */
  //Creacion del router y asignacion de ruta
  const router = Router();
  app.use("/api/movies", router);

  //Definicion de metodos
  router.get("/", async (req, res) => {
    const movies = await Movie.find();
    console.log(movies);
    return res.json(movies);
  });
  
  router.post("/", async (req, res) => {
    const newMovie = req.body;
    const postedMovie = await Movie.create(newMovie);
    console.log(postedMovie);

    return res.json({
      success: true,
      mensaje: "Pelicula agregada con éxito",
    });
  });

  router.put("/:name", async (req, res) => {
    const name = req.params.name;
    const newMovie = req.body;
    const updatedMovie = await Movie.updateOne({nombre: name}, newMovie)
    console.log(updatedMovie);
    return res.json({
      mensaje: "Cuerpo de la pelicula modificado exitosamente",
      pelicula: updatedMovie,
    });
  });

  router.patch("/:name", async (req, res) => {
    const name = req.params.name;
    const { genero, año } = req.body;

    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { nombre: name },
            { $set: { genero, año } },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ mensaje: "Película no encontrada" });
        }

        console.log(updatedMovie);
        return res.json({
            mensaje: "Género y año de la película modificados exitosamente",
            pelicula: updatedMovie,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al modificar la película" });
    }
});


  router.delete("/:indice", async (req, res) => {
    const indice = req.params.indice;
    const deletedMovie = await Movie.deleteOne({
      _id: indice
    })
    console.log(deletedMovie);
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
