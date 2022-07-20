const Module = require("../db/models/moduleModel");

exports.getAllModules = function () {
  return Module.query();
};

exports.getModuleById = function (moduleId) {
  return Module.query().findById(moduleId);
};

exports.createNewModule = function (moduleData) {
  return Module.query().insert(moduleData);
};

exports.updateModule = async function (moduleId, moduleData) {
  const result = await Module.query()
    .findById(moduleId)
    .patch(moduleData); //TODO: why async?
  return result;
};

exports.deleteModuleById = function (moduleId) {
  return Module.query().deleteById(moduleId);
};
