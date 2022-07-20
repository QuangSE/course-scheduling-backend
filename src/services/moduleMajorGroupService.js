const ModuleMajorGroup = require("../db/models/moduleMajorGroupModel");

exports.getAllModuleMajorGroups = function () {
  return ModuleMajorGroup.query();
};

exports.getModuleMajorGroupById = function (moduleMajorGroupId) {
  return ModuleMajorGroup.query().findById(moduleMajorGroupId);
};

exports.createNewModuleMajorGroup = function (moduleMajorGroupData) {
  return ModuleMajorGroup.query().insert(moduleMajorGroupData);
};

exports.updateModuleMajorGroup = async function (moduleMajorGroupId, moduleMajorGroupData) {
  const result = await ModuleMajorGroup.query()
    .findById(moduleMajorGroupId)
    .patch(moduleMajorGroupData); //TODO: why async?
  return result;
};

exports.deleteModuleMajorGroupById = function (moduleMajorGroupId) {
  return ModuleMajorGroup.query().deleteById(moduleMajorGroupId);
};
