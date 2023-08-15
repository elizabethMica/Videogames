const {getVGbyId} = require("../controllers/getVGbyId");

//handler para ruta id, para verificar si el id es un numero o es un uuid 
//le pasa dos parametros al controller uno es el id que se recibe por params y otro es un string que dice que tipo es el id

const getVGbyIdHandler =async(req, res)=>{
  const id = req.params.id;
  const source = isNaN(id)? "DB" : "API";
  try {
    const vgId = await getVGbyId(id, source)
    res.status(200).json(vgId)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
};

module.exports = {getVGbyIdHandler}