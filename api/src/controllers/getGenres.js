const {Genre}= require("../db"); // Import the 'Genre' model from the database

// Define an asynchronous request handler function for getting all genres
const getGenres = async(req, res)=>{
    try {
        // Query the database to retrieve all available genres
        const response = await Genre.findAll();
        // Respond with a JSON object containing the list of genres
        res.status(200).json(response)
    } catch (error) {
        // Handle any errors and respond with an error message
       res.status(400).send({error: error.message})
    }
};

module.exports={getGenres}