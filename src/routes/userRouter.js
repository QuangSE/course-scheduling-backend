const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');
const permissionId = require('../util/constants/permissionId');

const router = express.Router();

router.get('/', auth([permissionId.ADMIN]), userController.getAllUsers);
router.get('/:id', auth([permissionId.ADMIN]), userController.getUserById);
router.get(
  '/username/:username',
  auth([permissionId.ADMIN]),
  userController.getUserByUsername
);
router.get(
  '/:id/docent',
  auth([permissionId.ADMIN]),
  userController.getDocentOfUser
);
router.post('/', auth([permissionId.ADMIN]), userController.createNewUser);
router.patch('/:id/', auth([permissionId.ADMIN]), userController.updateUser); //TODO: remove edit and delete in route? (seems unnecessary)
router.patch(
  '/my-account/credentials',
  auth([permissionId.ADMIN]),
  userController.updateMyCredentials
);
router.delete(
  '/:id/',
  auth([permissionId.ADMIN]),
  userController.deleteUserById
);

module.exports = router;
