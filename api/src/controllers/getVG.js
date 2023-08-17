const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter") //funcion para filtrar la respuesta de axios

const getAllVG = async ()=>{

    //traer los videogames de la base de datos con findAll incluyendo dsus generos a los que estan asociados
    const vgDB = await Videogame.findAll({
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    });
    
    
    //array con promesas para luego resolverlas todas juntas
    let arrayWithPromises = []

    //for para mapear las paginas de la api, metiendolas en el array con promesas
    for(let i =1; i<6; i++){
      arrayWithPromises = [...arrayWithPromises, axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)]
    }
    
    
    //guardamos las promesas resueltas en una constante
    const resolved = await Promise.all(arrayWithPromises)
    
    //en otra constante mapeamos las respuestas ya que axios trae todo en una propiedad data 
    //y asi mismo la api tiene su informacion en una propiedad results
    const api = resolved.map((x)=>x.data.results)
    
    
    let arrayWithObjects = []
    //metemos cada videogame en el array creado arriba
    api.forEach(x=>x.forEach(z=>{
        arrayWithObjects.push(z)
    }))
    
    //le pasamos ese array de objetos a nuestra funcion para filtrar la informacion
    //usamos await 
    const apiResponse = apiFilter(arrayWithObjects)
   
    //retorna tanto los juegos de la base de datos como los de la api ya filtrados y los manda a la ruta 
    return [...vgDB,...apiResponse]

};

module.exports ={getAllVG}