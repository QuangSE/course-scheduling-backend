const express = require("express");
const Docent = require("../db/models/docentModel");
const docentController = require("../controllers/docentController");

// const dbConnection = require("../db/dbSetup");
// dbConnection();

const router = express.Router();

//TODO: check id params through middleware (express doc)

router.get("/", docentController.getAllDocents);
router.get("/:id", docentController.getDocentById);
router.post("/new", docentController.createNewDocent);
router.put("/:id/edit", docentController.updateDocent); //FIXME: should be PATCH instead of PUT?
router.delete("/:id/delete", docentController.deleteDocentById);

router.get("/:name", docentController.getDocentByLastName)

module.exports = router;
