const express = require("express");
const Docent = require("../db/models/docentModel");
const docentController = require("../controllers/docentController");

// const dbConnection = require("../db/dbSetup");
// dbConnection();

const router = express.Router();

//TODO: check id params through regex in routes

router.get("/", docentController.getAllDocents);
router.get("/:id", docentController.getDocentById);
//TODO: get total lsws, registered courses
router.post("/new", docentController.createNewDocent);
router.put("/:id/edit", docentController.updateDocent); //FIXME: should be PATCH instead of PUT? 
router.delete("/:id/delete", docentController.deleteDocentById); //TODO: remove edit and delete in route? (seems unnecessary)

router.get("/:name", docentController.getDocentByLastName)

module.exports = router;
