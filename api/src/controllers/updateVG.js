const {Videogame, Genre} = require('../db')

const updateVG =async (req, res)=>{
  try {
    const { id } = req.params;
      const { name, description, platforms, genres, rating, released,image } = req.body;
     
      const existingGame = await Videogame.findOne({ where: {name:name}})

      if(existingGame && existingGame.id !== id){
        
        return res.status(404).json({error: "The game already exists"})
      }

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
     

      if(editedGame[0] === 0) {
        return res.status(404).json({ message: 'No se encuentra el juego solicitado' });
      }

      const gameUpdated = await Videogame.findByPk(id);

      if (genres) {
        await gameUpdated.setGenres([]);
        for (const el of genres) {
          let genreFinded = await Genre.findOne({
            where: {
              name: el,
            },
          });
          await gameUpdated.addGenre(genreFinded);
        }
      }

      return res.status(200).json(gameUpdated);
    
    
  } catch (error) {
    res.status(404).send({error: error.message})
  }
};
 
module.exports= {updateVG}