const express = require("express");
const majorGroupController = require("../controllers/majorGroupController.js");


const router = express.Router();

router.get("/", majorGroupController.getAllMajorGroups);
router.get("/:id", majorGroupController.getMajorGroupById);
router.post("/", majorGroupController.createNewMajorGroup);
router.patch("/:id/", majorGroupController.updateMajorGroup); 
router.delete("/:id/", majorGroupController.deleteMajorGroupById);

module.exports = router;

