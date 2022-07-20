const MajorGroup = require("../db/models/MajorGroupModel");

exports.getAllMajorGroups = function () {
  return MajorGroup.query();
};

exports.getMajorGroupById = function (majorGroupId) {
  return MajorGroup.query().findById(majorGroupId);
};

exports.createNewMajorGroup = function (majorGroupData) {
  return MajorGroup.query().insert(majorGroupData);
};

exports.updateMajorGroup = async function (majorGroupId, majorGroupData) {
  const result = await MajorGroup.query()
    .findById(majorGroupId)
    .patch(majorGroupData); //TODO: why async?
  return result;
};

exports.deleteMajorGroupById = function (majorGroupId) {
  return MajorGroup.query().deleteById(majorGroupId);
};
