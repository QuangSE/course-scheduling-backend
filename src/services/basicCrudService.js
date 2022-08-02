const Docent = require('../db/models/docentModel');
const db = require('../db/dbSetup');

exports.getAllDocents = function (model) {
  return model.query();
};

exports.getDocentById = function (id) {
  return Docent.query().findById(id);
};

exports.createNewDocent = function (docentData) {
  return Docent.query().insert(docentData);
};

exports.updateDocent = async function (docent_id, docentData) {
  const result = await Docent.query().findById(docent_id).patch(docentData); //TODO: why async?
  return result;
};

exports.deleteDocentById = function (id) {
  return Docent.query().deleteById(id);
};

exports.getDocentByLastName = function (lastName) {
  return Docent.query().where(Docent.getLastNameColumn(), lastName);
};
