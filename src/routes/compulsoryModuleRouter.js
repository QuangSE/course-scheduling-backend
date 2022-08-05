const express = require('express');
const compulsoryModuleController = require('../controllers/compulsoryModuleController.js');

const router = express.Router();

router.get('/', compulsoryModuleController.getAllCompulsoryModules);
router.get('/:id', compulsoryModuleController.getCompulsoryModuleById);
router.get('/all/overview', compulsoryModuleController.getOverview);
router.post('/', compulsoryModuleController.createNewCompulsoryModule);
router.post('/by-ids', compulsoryModuleController.getCompulsoryModuleByIds);
router.patch('/:id/', compulsoryModuleController.updateCompulsoryModule);
router.delete('/:id/', compulsoryModuleController.deleteCompulsoryModuleById);

module.exports = router;
