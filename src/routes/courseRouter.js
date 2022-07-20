const express = require("express");
const courseController = require("../controllers/courseController");


const router = express.Router();

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createNewCourse);
router.patch("/:id/", courseController.updateCourse); 
router.delete("/:id/", courseController.deleteCourseById);

module.exports = router;

