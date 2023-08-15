const {Op} = require("sequelize")
const axios = require("axios")
const {Videogame, Genre} = require("../db");
const { apiFilter } = require("./apiFilter");
const {API_KEY} = process.env

//funcion para traer los juegos por su nombre
const getVGbyName = async(name)=>{
   //trae los de la base de datos incluyendo sus generos a los que estan asociados
   const responseDB = await Videogame.findAll({
     where:{
        name: {
            [Op.iLike]: `%${name}%`,
        }
     },
     include:[{
        model: Genre,
        attributes: ["name"],
        through: {attributes:[]}
     }]
   })
  
   //trae los videojuegos de la api, filtrandolos con la funcion hecha para eso
   let response = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results
   const responseApi = await apiFilter(response)
   
   //concatena las dos respuestas con spread operator y lo retorna
   return [...responseDB, ...responseApi]
}

module.exports = {getVGbyName}