const express = require('express');
const Docent = require('../db/models/docentModel');
const docentController = require('../controllers/docentController');
const { auth } = require('../middlewares/authMiddleware');
const permissionId = require('../util/constants/permissionId');

// const dbConnection = require("../db/dbSetup");
// dbConnection();

const router = express.Router();

//TODO: check id params through regex in routes

router.post('/', docentController.createNewDocent);
router.use(auth([permissionId.ADMIN, permissionId.USER]));
router.get('/', docentController.getAllDocents);
router.get('/:id', docentController.getDocentById);
router.get('/list/minimal', docentController.getMinimalDocentList);
router.get('/docent-course/overview', docentController.getDocentCourseOverview);
router.patch('/:id/', docentController.updateDocent);
router.delete('/:id/', docentController.deleteDocentById);
router.post('/by-last-name', docentController.getDocentByLastName);

module.exports = router;
