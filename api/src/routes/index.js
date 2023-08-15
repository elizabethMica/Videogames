const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {postVG} = require("../controllers/postVG");
const {getVGhandler} = require('../handlers/getVGhandler');
const {getVGbyIdHandler} = require('../handlers/getVGbyIdHandler');
const {getGenres} = require("../controllers/getGenres");
const {deleteVG} = require("../controllers/deleteVG");
const {updateVG} = require("../controllers/updateVG");

//hacer rutas para los filtrados en vez de hacerlos en el front
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getVGhandler);

router.get("/videogames/:id",getVGbyIdHandler);

router.post("/videogames",postVG);

router.get("/genres", getGenres)

router.delete("/delete/:id", deleteVG);

router.patch("/update/:id", updateVG)


module.exports = router;
