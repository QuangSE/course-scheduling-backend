const ExamRegulations = require("../db/models/ExamRegulationsModel");
const logger = require("../util/logger");

exports.getAllExamRegulations = function () {
  return ExamRegulations.query();
};

exports.getExamRegulationsById = function (examRegulationsId) {
  return ExamRegulations.query().findById(examRegulationsId);
};

exports.createNewExamRegulations = function (examRegulationsData) {
  return ExamRegulations.query().insert(examRegulationsData);
};

exports.updateExamRegulations = async function (
  examRegulationsId,
  examRegulationsData
) {
  const result = await ExamRegulations.query()
    .findById(examRegulationsId)
    .patch(examRegulationsData); //TODO: why async?
  return result;
};

exports.deleteExamRegulationsById = function (examRegulationsId) {
  return ExamRegulations.query().deleteById(examRegulationsId);
};

exports.getNumberOfSemesters = async function (examRegulationsId) {
  const examReg = await ExamRegulations.query()
    .withGraphFetched("erGroups")
    .modifyGraph("erGroups", (builder) => {
      builder
        .withGraphFetched("modules")
        .modifyGraph("modules", (builder) => {
          builder.orderBy("semester", "desc");
        })
        .where("exam_regulations_id", examRegulationsId);
    })
    .findById(examRegulationsId);

  let semester = 0;
  /*
  {
  "error": "RangeError",
  "message": "Invalid status code: 5"
}
  */
  examReg.erGroups.forEach((erGroup) => {
    logger.info(JSON.stringify(erGroup));
    const currSemester = erGroup.modules[0].semester;
    semester = currSemester > semester ? currSemester : semester;
  });

  return semester;
};

exports.getMajor = async function (examRegulationsId) {
  const examReg = ExamRegulations.query()
    .withGraphFetched("major")
    .findById(examRegulationsId);
  return examReg;
};

exports.getCourses = async function (examRegulationsId) {
  const courses = await ExamRegulations.query()
    .withGraphFetched("erGroups")
    .modifyGraph("erGroups", (builder) => {
      builder.withGraphFetched("modules")
      .modifyGraph("modules", (builder) => {
        builder.withGraphFetched("courses");
      });
    })
    .findById(examRegulationsId);

  return courses;
};


exports.getAllCourses = async function () {
  const courses = await ExamRegulations.query()
    .withGraphFetched("erGroups")
    .modifyGraph("erGroups", (builder) => {
      builder.withGraphFetched("modules")
      .modifyGraph("modules", (builder) => {
        builder.withGraphFetched("courses");
      });
    })

  return courses;
};

