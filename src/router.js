const express = require("express");

const docentRouter = require("./routes/docentRouter");
const userRouter = require("./routes/userRouter");
const permissionRouter = require("./routes/permissionRouter");
const docentCourseRouter = require("./routes/docentCourseRouter");
const courseRouter = require("./routes/courseRouter");
const moduleRouter = require("./routes/moduleRouter");
const majorRouter = require("./routes/majorRouter");
const examRegulationsRouter = require("./routes/examRegulationsRouter");
const compulsoryModuleRouter = require("./routes/compulsoryModuleRouter");
const majorGroupRouter = require("./routes/majorGroupRouter");
const moduleMajorGroupRouter = require("./routes/moduleMajorGroupRouter");
const authenticationRouter = require("./routes/authenticationRouter");
const { authenticateToken, auth } = require("./middlewares/authenticateToken");
const permissionId = require("./util/constants/permissionId");

const router = express.Router();


router.use("/auth", authenticationRouter);
/* router.use("/", authenticateToken); */

router.use("/docent", auth([permissionId.ADMIN]), docentRouter);
router.use("/user", userRouter);
router.use("/permission", auth([permissionId.ADMIN]), permissionRouter);
router.use("/docentCourse", auth([permissionId.ADMIN, permissionId.USER]), docentCourseRouter);
router.use("/course", auth([permissionId.ADMIN]), courseRouter);
router.use("/module", auth([permissionId.ADMIN]), moduleRouter);
router.use("/major", auth([permissionId.ADMIN]), majorRouter);
router.use("/examRegulations", auth([permissionId.ADMIN]), examRegulationsRouter);
router.use("/compulsoryModuleRouter", auth([permissionId.ADMIN]), compulsoryModuleRouter);
router.use("/majorGroupRouter", auth([permissionId.ADMIN]), majorGroupRouter);
router.use("/moduleMajorGroupRouter", auth([permissionId.ADMIN]), moduleMajorGroupRouter);

module.exports = router;
