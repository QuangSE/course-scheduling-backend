const express = require("express");
const userController = require("../controllers/userController");


const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/username/:username", userController.getUserByUsername);
router.get("/:id/docent", userController.getDocentOfUser)
router.post("/", userController.createNewUser);
router.patch("/:id/", userController.updateUser); //TODO: remove edit and delete in route? (seems unnecessary)
router.delete("/:id/", userController.deleteUserById);




module.exports = router;

