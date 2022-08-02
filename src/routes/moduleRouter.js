const express = require('express')
const moduleController = require('../controllers/moduleController')

const router = express.Router()

router.get('/', moduleController.getAllModules)
router.get('/:id', moduleController.getModuleById)
router.get('/:id/courses', moduleController.getCoursesWithModuleId)
router.post('/', moduleController.createNewModule)
router.post('/by-name-semester', moduleController.getModuleByNameSemester)
router.patch('/:id/', moduleController.updateModule)
router.delete('/:id/', moduleController.deleteModuleById)

module.exports = router
