const express = require("express");
const erGroupController = require("../controllers/erGroupController.js");


const router = express.Router();

router.get("/", erGroupController.getAllErGroups);
router.get("/:id", erGroupController.getErGroupById);
router.get("/:id/number-of-semesters", erGroupController.getNumberOfSemesters);
router.get("/:id/courses", erGroupController.getCourses);
router.post("/by-name/", erGroupController.getErGroup)
router.post("/", erGroupController.createNewErGroup);
router.patch("/:id/", erGroupController.updateErGroup); 
router.delete("/:id/", erGroupController.deleteErGroupById);

module.exports = router;

