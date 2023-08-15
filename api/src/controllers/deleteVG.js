const {Videogame, Genre} = require ("../db.js")

//funcion para borrar un videogame de la base de datos

const deleteVG = async (req, res)=>{
  try {
    //trae el id por params
    const {id} = req.params
    //busca el elemento por su id y lo "destruye"
    const response = await Videogame.destroy({where : {id: id}})
    //trae todos los demas videojuegos que "sobrevivieron"
    const allVideoGames = await Videogame.findAll({
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    })
    res.status(200).json(allVideoGames)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};

module.exports = {deleteVG}
