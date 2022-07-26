const express = require("express");
const examRegulationsController = require("../controllers/examRegulationsController.js");


const router = express.Router();

router.get("/", examRegulationsController.getAllExamRegulations);
router.get("/:id", examRegulationsController.getExamRegulationsById);
router.get("/:id/number-of-semesters", examRegulationsController.getNumberOfSemesters);
router.get("/:id/courses", examRegulationsController.getCourses);
router.get("/all/overview/courses", examRegulationsController.getAllCourses);
router.post("/", examRegulationsController.createNewExamRegulations);
router.patch("/:id/", examRegulationsController.updateExamRegulations); 
router.delete("/:id/", examRegulationsController.deleteExamRegulationsById);

module.exports = router;

