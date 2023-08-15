const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter");

//funcion para traer los videojuegos por id, si el source es "API" busca ese mismo id en la api, 
//si es id es "DB" los busca en la base de datos
const getVGbyId = async(id, source)=>{
    if(source === "API"){
         const response = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
         const vgApi = await apiFilter([response])

         return vgApi[0]
    }else{
    const vgDB = await Videogame.findOne({
        where: {id:id},
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
         }]
       })
       return vgDB
    }
};

module.exports = {getVGbyId}