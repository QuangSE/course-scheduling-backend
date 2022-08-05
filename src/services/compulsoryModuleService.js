const CompulsoryModule = require('../db/models/CompulsoryModuleModel');

exports.getAllCompulsoryModules = function () {
  return CompulsoryModule.query();
};

exports.getCompulsoryModuleById = function (compulsoryModuleId) {
  return CompulsoryModule.query().findById(compulsoryModuleId);
};

exports.createNewCompulsoryModule = function (compulsoryModuleData) {
  return CompulsoryModule.query().insert(compulsoryModuleData);
};

exports.updateCompulsoryModule = async function (
  compulsoryModuleId,
  compulsoryModuleData
) {
  const result = await CompulsoryModule.query()
    .findById(compulsoryModuleId)
    .patch(compulsoryModuleData); //TODO: why async?
  return result;
};

exports.deleteCompulsoryModuleById = function (compulsoryModuleId) {
  return CompulsoryModule.query().deleteById(compulsoryModuleId);
};

exports.getMajor = function () {
  return CompulsoryModule.query().withGraphFetched('major');
};

exports.getCompulsoryModuleByIds = function (moduleId, majorId) {
  return CompulsoryModule.query()
    .first()
    .where(CompulsoryModule.moduleIdColumn, moduleId)
    .where(CompulsoryModule.majorIdColumn, majorId);
};
