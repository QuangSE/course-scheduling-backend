const express = require('express');
const majorController = require('../controllers/majorController.js');

const router = express.Router();

router.get('/', majorController.getAllMajors);
router.get('/:id', majorController.getMajorById);
router.get('/:id/exam-regulations', majorController.getExamRegulations);
router.post('/', majorController.createNewMajor);
router.post('/by-name-degree', majorController.getMajorByNameDegree);
router.patch('/:id/', majorController.updateMajor);
router.delete('/:id/', majorController.deleteMajorById);

module.exports = router;
