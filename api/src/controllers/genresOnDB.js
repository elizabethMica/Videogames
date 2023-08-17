const axios = require("axios");
const {API_KEY} = process.env
const {Videogame, Genre} = require("../db")



const get_genres = async()=>{

    const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results

  
    const genres = await response.map(el => el.name)

    return genres
};



const genresOnDB = async ()=>{
    try {
       
        const genres =await Genre.findAll();
       
        if(genres.length === 0){
            
            const allGenres = await get_genres();

            
           for(let i=0; i<allGenres.length; i++){
            await Genre.create({name: allGenres[i]})
           } 
             
        }
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = {genresOnDB}