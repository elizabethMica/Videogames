const axios = require ("axios");
const {Videogame, Genre} = require("../db");
const {API_KEY} = process.env
const {apiFilter} = require("./apiFilter");

// Define an asynchronous function for getting a videogame by ID from either the API or the database
const getVGbyId = async(id, source)=>{
    if(source === "API"){ // Check if the source is the API
         // Make an API request to fetch the videogame data using the provided 'id' and API key
         const response = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
         // Filter and format the API response using the 'apiFilter' function
         const vgApi = await apiFilter([response])
        // Return the filtered API response
         return vgApi[0]

    }else{// If the source is not the API
   // Query the database to find the videogame with the provided 'id'
    const vgDB = await Videogame.findOne({
        where: {id:id},
        include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes:[]}
         }]
       });
       // Return the database response
       return vgDB
    }
};

module.exports = {getVGbyId}