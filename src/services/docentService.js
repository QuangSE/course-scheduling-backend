const Docent = require('../db/models/docentModel');
const db = require('../db/dbSetup');
const { firstNameColumn } = require('../db/models/docentModel');

exports.getAllDocents = function () {
  return Docent.query();
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
  return Docent.query().first().where(Docent.lastNameColumn, lastName);
};

exports.getMinimalDocentList = function () {
  return Docent.query().select(
    Docent.idColumn,
    Docent.lastNameColumn,
    Docent.firstNameColumn
  );
};

exports.getCoursesByDocentId = function (docentId) {
  return Docent.query()
    .withGraphFetched('[docentCourses.course]')
    .findById(docentId);
};

exports.getCoursesWithModulesByDocentId = function (docentId) {
  return Docent.query()
    .withGraphFetched('[docentCourses.course.module]')
    .findById(docentId);
};

exports.getDocentByName = function (lastName, firstName) {
  return Docent.query()
    .first()
    .where(Docent.lastNameColumn, lastName)
    .where(Docent.firstNameColumn, firstName);
};

exports.getDocentCourseOverview = function () {
  return Docent.query().withGraphFetched('[docentCourses.course]');
};
