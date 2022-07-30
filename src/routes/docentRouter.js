const express = require("express");
const Docent = require("../db/models/docentModel");
const docentController = require("../controllers/docentController");

// const dbConnection = require("../db/dbSetup");
// dbConnection();

const router = express.Router();

//TODO: check id params through regex in routes

router.get("/", docentController.getAllDocents);
router.get("/:id", docentController.getDocentById);
router.get("/list/minimal", docentController.getMinimalDocentList);
//TODO: get total lsws, registered courses
router.post("/", docentController.createNewDocent);
router.put("/:id/", docentController.updateDocent); //FIXME: should be PATCH instead of PUT?
router.delete("/:id/", docentController.deleteDocentById); //TODO: remove edit and delete in route? (seems unnecessary)

router.post("/by-last-name", docentController.getDocentByLastName);

module.exports = router;
