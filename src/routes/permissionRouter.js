const express = require('express');
const permissionController = require('../controllers/permissionController');

const router = express.Router();

router.get('/', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.post('/', permissionController.createNewPermission);
router.put('/:id/', permissionController.updatePermission); //TODO: remove edit and delete in route? (seems unnecessary)
router.delete('/:id/', permissionController.deletePermissionById);

module.exports = router;
