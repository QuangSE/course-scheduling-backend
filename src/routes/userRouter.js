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

router.get(
  '/my-account/total-lsws',
  auth([permissionId.ADMIN, permissionId.USER]),
  userController.getTotalLsws
);
router.get(
  '/my-account/visible-courses',
  auth([permissionId.ADMIN, permissionId.USER]),
  userController.getVisibleCourses
);

router.post('/', userController.createNewUser);
router.patch('/:id/', auth([permissionId.ADMIN]), userController.updateUser);
router.patch(
  '/my-account/credentials',
  auth([permissionId.ADMIN, permissionId.USER]),
  userController.updateMyCredentials
);
router.delete(
  '/:id/',
  auth([permissionId.ADMIN]),
  userController.deleteUserById
);

module.exports = router;
