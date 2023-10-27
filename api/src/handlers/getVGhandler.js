const { getAllVG } = require("../controllers/getVG");  // Import the controller function for getting all videogames
const {getVGbyName} = require("../controllers/getVGbyName"); // Import the controller function for getting a videogame by name

// Define an asynchronous request handler function for getting videogames
const getVGhandler = async(req, res)=>{
  try {
    const name = req.query.name // Extract the 'name' query parameter from the request
    // Check if 'name' is provided in the query parameter, if so, call the controller to get a video game by name; 
    //otherwise, call the controller to get all videogames
    const response = name? await getVGbyName(name) : await getAllVG();

    res.status(200).json(response) // Respond with a JSON object containing the video game(s) data

  } catch (error) {
    res.status(404).send({error: error.message})
  }
};

module.exports= {getVGhandler}

