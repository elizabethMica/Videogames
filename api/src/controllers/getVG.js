const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter")

// Define an asynchronous function for getting all videogames from both the database and an external API
const getAllVG = async ()=>{

   // Query the database to retrieve all video games, including associated genres
    const vgDB = await Videogame.findAll({
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
        }]
    });
    
    
    
    let arrayWithPromises = []

    // Make multiple API requests to fetch video games from the external source (up to 5 pages)
    for(let i =1; i<6; i++){
      arrayWithPromises = [...arrayWithPromises, axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)]
    }
    
    // Resolve all the promises concurrently using Promise.all
    const resolved = await Promise.all(arrayWithPromises)
    
    // Extract the 'results' from the API responses
    const api = resolved.map((x)=>x.data.results)
    
    
    let arrayWithObjects = []
   
    // Flatten the array of API responses into a single array of objects
    api.forEach(x=>x.forEach(z=>{
        arrayWithObjects.push(z)
    }))
    
    // Filter and format the API response using the 'apiFilter' function
    const apiResponse = apiFilter(arrayWithObjects)
   
    // Combine and return both database and API responses as an array
    return [...vgDB,...apiResponse]

};

module.exports ={getAllVG}