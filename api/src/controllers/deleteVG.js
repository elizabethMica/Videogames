const {Videogame, Genre} = require ("../db.js")

// Define an asynchronous controller function for deleting a videogame
const deleteVG = async (req, res)=>{
  try {
    
    const {id} = req.params; // Extract the 'id' parameter from the request

    // Delete the videogame with the specified 'id' from the database
    const response = await Videogame.destroy({where : {id: id}})
   
    // Query the database to retrieve all videogames, including associated genres
    const allVideoGames = await Videogame.findAll({
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    })
      // Respond with a JSON object containing the updated list of videogames
    res.status(200).json(allVideoGames)
  } catch (error) {
    // Handle any errors and respond with an error message
    res.status(400).send({error:error.message})
  }
};

module.exports = {deleteVG}
