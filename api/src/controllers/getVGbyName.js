const {Op} = require("sequelize");  // Import the 'Op' object for Sequelize operators
const axios = require("axios"); // Import the Axios library for making API requests
const {Videogame, Genre} = require("../db"); // Import the 'Videogame' and 'Genre' models from the database
const { apiFilter } = require("./apiFilter"); // Import a function for filtering and formatting API data
const {API_KEY} = process.env; // Get the API key from environment variables

// Define an asynchronous function for getting videogames by name
const getVGbyName = async(name)=>{
  
    // Query the database to find video games with names containing the provided 'name'
   const responseDB = await Videogame.findAll({
     where:{
        name: {
            [Op.iLike]: `%${name}%`, // Use a case-insensitive search using Sequelize's 'iLike' operator
        }
     },
     include:[{
        model: Genre,
        attributes: ["name"],
        through: {attributes:[]}
     }]
   })
  
   // Make an API request to fetch video games from an external source using the provided 'name' and API key
   let response = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results

   // Filter and format the API response using the 'apiFilter' function
   const responseApi = await apiFilter(response)
   
   // Combine and return both database and API responses as an array
   return [...responseDB, ...responseApi]
}

module.exports = {getVGbyName}