const { Router } = require('express');
const {postVG} = require("../controllers/postVG");
const {getVGhandler} = require('../handlers/getVGhandler');
const {getVGbyIdHandler} = require('../handlers/getVGbyIdHandler');
const {getGenres} = require("../controllers/getGenres");
const {deleteVG} = require("../controllers/deleteVG");
const {updateVG} = require("../controllers/updateVG");

// Create an instance of the Express Router
const router = Router();

// Define routes and their corresponding handlers or controllers

// Route to get a list of all videogames
router.get("/videogames", getVGhandler);

// Route to get a specific videogame by its ID
router.get("/videogames/:id",getVGbyIdHandler);

// Route to get a list of videogame genres
router.get("/genres", getGenres);

// Route to create a new videogame
router.post("/videogames",postVG);

// Route to delete a videogame by its ID
router.delete("/delete/:id", deleteVG);

// Route to update a videogame by its ID
router.patch("/update/:id", updateVG);


module.exports = router;
