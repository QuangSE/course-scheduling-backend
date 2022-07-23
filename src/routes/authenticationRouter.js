const express = require("express");
const authenticationController = require("../controllers/authenticationController");


const router = express.Router();


router.post("/login", authenticationController.verifyLogin);
router.get("/login", authenticationController.getLoginStatus);
router.post("/logout", authenticationController.logout);

module.exports = router;

