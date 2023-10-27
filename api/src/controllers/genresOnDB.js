const axios = require("axios");
const {API_KEY} = process.env
const {Videogame, Genre} = require("../db")


// Define an asynchronous function to retrieve video game genres from an external API
const get_genres = async()=>{
    // Make an API request to fetch genre data from the external source using the API key
    const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results

    // Extract genre names from the API response
    const genres = await response.map(el => el.name)

    return genres
};


// Define an asynchronous function to populate the database with genres if it's empty
const genresOnDB = async ()=>{
    try {
       // Query the database to retrieve existing genres
        const genres =await Genre.findAll();
        
        if(genres.length === 0){
            // If there are no genres in the database, fetch genres from the external API
            const allGenres = await get_genres();

            
           for(let i=0; i<allGenres.length; i++){
            // Create records in the 'Genre' table for each genre fetched from the API
            await Genre.create({name: allGenres[i]})
           } 
             
        }
    } catch (error) {
        // Handle any errors and return an error message
        return {error: error.message}
    }
};

module.exports = {genresOnDB}