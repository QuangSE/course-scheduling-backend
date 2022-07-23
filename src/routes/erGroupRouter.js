const express = require("express");
const erGroupController = require("../controllers/erGroupController.js");


const router = express.Router();

router.get("/", erGroupController.getAllErGroups);
router.get("/:id", erGroupController.getErGroupById);
router.post("/", erGroupController.createNewErGroup);
router.patch("/:id/", erGroupController.updateErGroup); 
router.delete("/:id/", erGroupController.deleteErGroupById);

module.exports = router;

