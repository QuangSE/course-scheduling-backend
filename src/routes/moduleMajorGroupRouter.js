const express = require("express");
const moduleMajorGroupController = require("../controllers/moduleMajorGroupController");


const router = express.Router();

router.get("/", moduleMajorGroupController.getAllModuleMajorGroups);
router.get("/:id", moduleMajorGroupController.getModuleMajorGroupById);
router.post("/", moduleMajorGroupController.createNewModuleMajorGroup);
router.patch("/:id/", moduleMajorGroupController.updateModuleMajorGroup); 
router.delete("/:id/", moduleMajorGroupController.deleteModuleMajorGroupById);

module.exports = router;

