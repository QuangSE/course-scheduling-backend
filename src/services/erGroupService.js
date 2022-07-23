const ErGroup = require("../db/models/erGroupModel");

exports.getAllErGroups = function () {
  return ErGroup.query();
};

exports.getErGroupById = function (erGroupId) {
  return ErGroup.query().findById(erGroupId);
};

exports.createNewErGroup = function (erGroupData) {
  return ErGroup.query().insert(erGroupData);
};

exports.updateErGroup = async function (erGroupId, erGroupData) {
  const result = await ErGroup.query()
    .findById(erGroupId)
    .patch(erGroupData); //TODO: why async?
  return result;
};

exports.deleteErGroupById = function (erGroupId) {
  return ErGroup.query().deleteById(erGroupId);
};
