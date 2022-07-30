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
const erGroupRouter = require("./routes/erGroupRouter");
const moduleErGroupRouter = require("./routes/moduleErGroupRouter");
const authenticationRouter = require("./routes/authenticationRouter");
const { authenticateToken, auth } = require("./middlewares/authenticateToken");
const permissionId = require("./util/constants/permissionId");

const router = express.Router();


router.use("/auth", authenticationRouter);
/* router.use("/", authenticateToken); */

//TODO: endpoint url hyphen-ated instead of camelCase
router.use("/docent", auth([permissionId.ADMIN]), docentRouter);
router.use("/user", userRouter);
router.use("/permission", auth([permissionId.ADMIN]), permissionRouter);
router.use("/docent-course", auth([permissionId.ADMIN, permissionId.USER]), docentCourseRouter);
router.use("/course", auth([permissionId.ADMIN]), courseRouter);
router.use("/module", auth([permissionId.ADMIN]), moduleRouter);
router.use("/major", auth([permissionId.ADMIN]), majorRouter);
router.use("/exam-regulations", examRegulationsRouter);
router.use("/compulsory-module", auth([permissionId.ADMIN]), compulsoryModuleRouter);
router.use("/er-group", auth([permissionId.ADMIN]), erGroupRouter);
router.use("/module-er-group", auth([permissionId.ADMIN]), moduleErGroupRouter);

module.exports = router;
