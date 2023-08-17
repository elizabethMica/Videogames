const {getVGbyId} = require("../controllers/getVGbyId");


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