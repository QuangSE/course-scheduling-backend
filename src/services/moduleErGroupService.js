const ModuleErGroup = require("../db/models/moduleErGroupModel");

exports.getAllModuleErGroups = function () {
  return ModuleErGroup.query();
};

exports.getModuleErGroupById = function (moduleErGroupId) {
  return ModuleErGroup.query().findById(moduleErGroupId);
};

exports.createNewModuleErGroup = function (moduleErGroupData) {
  return ModuleErGroup.query().insert(moduleErGroupData);
};

exports.updateModuleErGroup = async function (moduleErGroupId, moduleErGroupData) {
  const result = await ModuleErGroup.query()
    .findById(moduleErGroupId)
    .patch(moduleErGroupData); //TODO: why async?
  return result;
};

exports.deleteModuleErGroupById = function (moduleErGroupId) {
  return ModuleErGroup.query().deleteById(moduleErGroupId);
};