const express = require("express");

const docentRouter = require("./routes/docentRouter");
const userRouter = require("./routes/userRouter");
const permissionRouter = require("./routes/permissionRouter");
const docentCourseRouter = require("./routes/docentCourseRouter");
const courseRouter = require("./routes/courseRouter");
const moduleRouter = require("./routes/moduleRouter");
const majorRouter = require("./routes/majorRouter");
const examRegulationsRouter = require("./routes/examRegulationsRouter");
const compulsoryModuleRouter = require("./routes/compulsoryModuleRouter")
const majorGroupRouter = require("./routes/majorGroupRouter");
const moduleMajorGroupRouter = require("./routes/moduleMajorGroupRouter");

const router = express.Router();

router.use("/docent", docentRouter);
router.use("/user", userRouter);
router.use("/permission", permissionRouter);
router.use("/docentCourse", docentCourseRouter);
router.use("/course", courseRouter);
router.use("/module", moduleRouter);
router.use("/major", majorRouter);
router.use("/examRegulations", examRegulationsRouter);
router.use("/compulsoryModuleRouter", compulsoryModuleRouter);
router.use("/majorGroupRouter", majorGroupRouter);
router.use("/moduleMajorGroupRouter", moduleMajorGroupRouter);

module.exports = router;
