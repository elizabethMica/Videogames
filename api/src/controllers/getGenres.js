const {Genre}= require("../db");

//funcion para obtener los generos de la base de datos

const getGenres = async(req, res)=>{
    try {
        const response = await Genre.findAll();
        res.status(200).json(response)
    } catch (error) {
       res.status(400).send({error: error.message})
    }
};

module.exports={getGenres}