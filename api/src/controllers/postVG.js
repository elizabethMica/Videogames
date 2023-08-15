const {Videogame, Genre} = require("../db");

const postVG = async(req, res)=>{
   try {
    const imagen = "https://media.istockphoto.com/id/1303938743/es/foto/blanco-la-mejor-almohadilla-de-juego-flotando-sobre-fondo-blanco-idea-conceptual-m%C3%ADnima.jpg?s=612x612&w=0&k=20&c=_yJ_TOpSKZUu0dN7de7BCq--NFagk9xxRNUfiRVt06g="

    const {name, image, platforms, released, rating, genres, description} = req.body

    const [newVG, created] = await Videogame.findOrCreate({
        where: {name},
        defaults: {
            name: name,
            image: image? image : imagen,
            platforms: platforms,
            released: released,
            description: description,
            rating: rating
        }
    })

    if(created === true){
        for(let i = 0; i<genres.length; i++){
            const genreId = (await Genre.findOne({
                where:{
                    name:genres[i]
                }
            })).id
            await newVG.addGenre(genreId)
        }
    
        const finalNewVG = await Videogame.findOne({
            where:{id: newVG.id},
            include:[
                {model: Genre,
                attributes: ["name"],
                through: {attributes:[]}}
            ]
        })
        res.status(200).json(finalNewVG)
        console.log("videogame creado")
        }else{
            res.status(404).json({error:"The videogame already exists"})
        }
    
   } catch (error) {
    res.status(400).send({error: error.message})
   }
};

module.exports = {postVG};