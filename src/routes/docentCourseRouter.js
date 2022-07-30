const express = require("express");
const docentCourseController = require("../controllers/docentCourseController");


const router = express.Router();

router.get("/", docentCourseController.getAllDocentCourses);
router.get("/:id", docentCourseController.getDocentCourseById);
router.post("/", docentCourseController.createNewDocentCourse);
router.post("/by-ids", docentCourseController.getDocentCourse);
router.patch("/:id/", docentCourseController.updateDocentCourse); 
router.delete("/:id/", docentCourseController.deletedocentCourseById);


module.exports = router;

