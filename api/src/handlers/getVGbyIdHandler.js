const {getVGbyId} = require("../controllers/getVGbyId"); // Import the controller function for getting a videogame by ID

// Define an asynchronous request handler function for getting a videogame by its ID
const getVGbyIdHandler =async(req, res)=>{
  const id = req.params.id; // Extract the 'id' parameter from the request URL
  const source = isNaN(id)? "DB" : "API"; // Determine the source of the videogame data (DB or API)
  try {
    const vgId = await getVGbyId(id, source) // Call the controller function to retrieve the videogame by ID
    res.status(200).json(vgId) // Respond with a JSON object containing the videogame data
  } catch (error) {
    res.status(400).send({error: error.message}) // Handle any errors and respond with an error message
  }
};

module.exports = {getVGbyIdHandler}