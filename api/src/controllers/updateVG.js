const {Videogame, Genre} = require('../db') // Import the 'Videogame' and 'Genre' models from the database

// Define an asynchronous controller function for updating a videogame
const updateVG =async (req, res)=>{
  try {
    const { id } = req.params; // Extract the 'id' parameter from the request
      const { name, description, platforms, genres, rating, released,image } = req.body; // Extract data from the request body
     
       // Check if a game with the same 'name' already exists in the database
      const existingGame = await Videogame.findOne({ where: {name:name}})

      // If a game with the same 'name' exists and has a different ID, return an error
      if(existingGame && existingGame.id !== id){
        return res.status(404).json({error: "The game already exists"})
      }

      // Update the specified game's details in the database
      const editedGame = await Videogame.update(
        {
          name: name,
          description: description,
          platforms: platforms,
          genres: genres,
          rating: rating,
          released: released,
          image: image
        },
        {
          where: {
            id: id,
          },
        }
      );
     
     // If no rows were affected during the update, return an error
      if(editedGame[0] === 0) {
        return res.status(404).json({ message: 'No se encuentra el juego solicitado' });
      }
     // Retrieve the updated game from the database
      const gameUpdated = await Videogame.findByPk(id);

      // If 'genres' are provided in the request, update the associated genres
      if (genres) {
        await gameUpdated.setGenres([]);
        for (const el of genres) {
          // Find the genre in the database
          let genreFound = await Genre.findOne({
            where: {
              name: el,
            },
          });
          // Associate the found genre with the updated game
          await gameUpdated.addGenre(genreFound);
        }
      }
      // Return the updated game details in the response
      return res.status(200).json(gameUpdated);
    
    
  } catch (error) {
    res.status(404).send({error: error.message})  // Handle any errors and respond with an error message
  }
};
 
module.exports= {updateVG}