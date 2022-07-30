const DocentCourse = require("../db/models/docentCourseModel");

exports.getAllDocentCourses = function () {
  return DocentCourse.query();
};

exports.getDocentCourseById = function (docentCourseId) {
  return DocentCourse.query().findById(docentCourseId);
};

exports.createNewDocentCourse = function (docentCourseData) {
  return DocentCourse.query().insert(docentCourseData);
};

exports.updateDocentCourse = async function (docentCourseId, docentCourseData) {
  return DocentCourse.query().findById(docentCourseId).patch(docentCourseData); //TODO: await?
};

exports.deleteDocentCourseById = function (docentCourseId) {
  return DocentCourse.query().deleteById(docentCourseId);
};

exports.getDocentCourse = async function (docentId, courseId) {
  const DocentCourseId = await DocentCourse.query()
    .first()
    .where(DocentCourse.docentIdColumn, docentId)
    .where(DocentCourse.courseIdColumn, courseId);
  return DocentCourseId;
};
