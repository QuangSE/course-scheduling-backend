const express = require("express");
const moduleErGroupController = require("../controllers/moduleErGroupController");


const router = express.Router();

router.get("/", moduleErGroupController.getAllModuleErGroups);
router.get("/:id", moduleErGroupController.getModuleErGroupById);
router.post("/", moduleErGroupController.createNewModuleErGroup);
router.post("/by-ids", moduleErGroupController.getModuleErGroupByIds);
router.patch("/:id/", moduleErGroupController.updateModuleErGroup); 
router.delete("/:id/", moduleErGroupController.deleteModuleErGroupById);

module.exports = router;

