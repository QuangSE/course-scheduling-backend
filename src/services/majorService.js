const Major = require("../db/models/MajorModel");

exports.getAllMajors = function () {
  return Major.query();
};

exports.getMajorById = function (majorId) {
  return Major.query().findById(majorId);
};

exports.createNewMajor = function (majorData) {
  return Major.query().insert(majorData);
};

exports.updateMajor = async function (majorId, majorData) {
  const result = await Major.query()
    .findById(majorId)
    .patch(majorData); //TODO: why async?
  return result;
};

exports.deleteMajorById = function (majorId) {
  return Major.query().deleteById(majorId);
};
