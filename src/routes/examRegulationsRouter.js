const express = require("express");
const examRegulationsController = require("../controllers/examRegulationsController.js");


const router = express.Router();

router.get("/", examRegulationsController.getAllExamRegulations);
router.get("/:id", examRegulationsController.getExamRegulationsById);
router.post("/", examRegulationsController.createNewExamRegulations);
router.patch("/:id/", examRegulationsController.updateExamRegulations); 
router.delete("/:id/", examRegulationsController.deleteExamRegulationsById);

module.exports = router;

