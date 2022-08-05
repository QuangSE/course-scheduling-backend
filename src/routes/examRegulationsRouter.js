const express = require('express');
const examRegulationsController = require('../controllers/examRegulationsController.js');
const { auth } = require('../middlewares/authMiddleware');
const permissionId = require('../util/constants/permissionId');

const router = express.Router();

router.get(
  '/',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getAllExamRegulations
);
router.get(
  '/:id',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getExamRegulationsById
);
router.get(
  '/:id/number-of-semesters',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getNumberOfSemesters
);
router.get(
  '/:id/courses',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getCourses
);
router.get(
  '/:id/er-groups',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getErGroups
);
router.get(
  '/:id/module/:moduleId',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getExistingModule
);
router.get(
  '/all/overview/courses',
  auth([permissionId.ADMIN, permissionId.USER]),
  examRegulationsController.getAllCourses
);
router.post(
  '/',
  auth([permissionId.ADMIN]),
  examRegulationsController.createNewExamRegulations
);
router.patch(
  '/:id/',
  auth([permissionId.ADMIN]),
  examRegulationsController.updateExamRegulations
);
router.delete(
  '/:id/',
  auth([permissionId.ADMIN]),
  examRegulationsController.deleteExamRegulationsById
);

module.exports = router;
