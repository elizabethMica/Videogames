const { getAllVG } = require("../controllers/getVG");
const {getVGbyName} = require("../controllers/getVGbyName");

//handler para la ruta que trae todos los juegos, para verificar si es que tiene algo en query o no, 
//dependiendo de si tiene name, ejecuta una u otra funcion

const getVGhandler = async(req, res)=>{
  try {
    const name = req.query.name
    const response = name? await getVGbyName(name) : await getAllVG();

    res.status(200).json(response)

  } catch (error) {
    res.status(404).send({error: error.message})
  }
};

module.exports= {getVGhandler}

