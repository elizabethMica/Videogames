const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter")

const getAllVG = async ()=>{

    
    const vgDB = await Videogame.findAll({
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    });
    
    
    
    let arrayWithPromises = []

    
    for(let i =1; i<6; i++){
      arrayWithPromises = [...arrayWithPromises, axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)]
    }
    
    
    
    const resolved = await Promise.all(arrayWithPromises)
    
    
    const api = resolved.map((x)=>x.data.results)
    
    
    let arrayWithObjects = []
   
    api.forEach(x=>x.forEach(z=>{
        arrayWithObjects.push(z)
    }))
    
   
    const apiResponse = apiFilter(arrayWithObjects)
   
     
    return [...vgDB,...apiResponse]

};

module.exports ={getAllVG}