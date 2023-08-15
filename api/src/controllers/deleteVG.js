const {Videogame, Genre} = require ("../db.js")

const deleteVG = async (req, res)=>{
  try {
    const {id} = req.params
    const response = await Videogame.destroy({where : {id: id}})
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
