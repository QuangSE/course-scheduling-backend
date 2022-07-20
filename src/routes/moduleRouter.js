const express = require("express");
const moduleController = require("../controllers/moduleController");


const router = express.Router();

router.get("/", moduleController.getAllModules);
router.get("/:id", moduleController.getModuleById);
router.post("/", moduleController.createNewModule);
router.patch("/:id/", moduleController.updateModule); 
router.delete("/:id/", moduleController.deleteModuleById);

module.exports = router;

