const axios = require("axios");
const {API_KEY} = process.env
const {Videogame, Genre} = require("../db")

//funcion para extraer los generos de la api y guardarlos en la base de datos

const get_genres = async()=>{

    const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results

    //hacemos un map ya que cada genero tiene el nombre del genero en su propiedad name
    const genres = await response.map(el => el.name)

    return genres
};


//funcion para guardarlos en la bdd
const genresOnDB = async ()=>{
    try {
        //trae los geenros de la bdd con findAll para ver si hay algo
        const genres =await Genre.findAll();
        //ya que no hay ninguno en la base de datos ya, cumple con la condicion
        if(genres.length === 0){
            //guarda los generos traidos en la funcion anterior en una constante
            const allGenres = await get_genres();

            //por cada elemento crea un modelo genero con la propiedad name en donde está el nombre del genero
           for(let i=0; i<allGenres.length; i++){
            await Genre.create({name: allGenres[i]})
           } 
        // console.log("cargados")      
        }
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = {genresOnDB}