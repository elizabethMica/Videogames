const {Videogame, Genre} = require("../db");

// Define an asynchronous controller function for creating a new videogame
const postVG = async(req, res)=>{
   try {
    const imagen = "https://media.istockphoto.com/id/1303938743/es/foto/blanco-la-mejor-almohadilla-de-juego-flotando-sobre-fondo-blanco-idea-conceptual-m%C3%ADnima.jpg?s=612x612&w=0&k=20&c=_yJ_TOpSKZUu0dN7de7BCq--NFagk9xxRNUfiRVt06g="

    const {name, image, platforms, released, rating, genres, description} = req.body

    // Find or create a new videogame in the database based on its name
    const [newVG, created] = await Videogame.findOrCreate({
        where: {name},
        defaults: {
            name: name,
            image: image? image : imagen, // Set the default image if not provided
            platforms: platforms,
            released: released,
            description: description,
            rating: rating
        }
    })

    // If the videogame was created, associate it with genres and retrieve its details
    if(created === true){
        for(let i = 0; i<genres.length; i++){
            // Find the genre by name and retrieve its ID
            const genreId = (await Genre.findOne({
                where:{
                    name:genres[i]
                }
            })).id
            // Associate the videogame with the genre
            await newVG.addGenre(genreId)
        }
         // Retrieve the final details of the newly created videogame, including associated genres
        const finalNewVG = await Videogame.findOne({
            where:{id: newVG.id},
            include:[
                {model: Genre,
                attributes: ["name"],
                through: {attributes:[]}}
            ]
        })
        // Respond with the newly created videogame details
        res.status(200).json(finalNewVG)
      
        }else{
            // If the videogame already exists, return an error
            res.status(404).json({error:"The videogame already exists"})
        }
    
   } catch (error) {
    res.status(400).send({error: error.message})
   }
};

module.exports = {postVG};