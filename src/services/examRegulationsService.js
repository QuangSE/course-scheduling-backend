const ExamRegulations = require("../db/models/ExamRegulationsModel");

exports.getAllExamRegulations = function () {
  return ExamRegulations.query();
};

exports.getExamRegulationsById = function (examRegulationsId) {
  return ExamRegulations.query().findById(examRegulationsId);
};

exports.createNewExamRegulations = function (examRegulationsData) {
  return ExamRegulations.query().insert(examRegulationsData);
};

exports.updateExamRegulations = async function (examRegulationsId, examRegulationsData) {
  const result = await ExamRegulations.query()
    .findById(examRegulationsId)
    .patch(examRegulationsData); //TODO: why async?
  return result;
};

exports.deleteExamRegulationsById = function (examRegulationsId) {
  return ExamRegulations.query().deleteById(examRegulationsId);
};
