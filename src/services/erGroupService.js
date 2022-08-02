const ErGroup = require('../db/models/erGroupModel');
const logger = require('../util/logger');

exports.getAllErGroups = function () {
    return ErGroup.query();
};

exports.getErGroupById = function (erGroupId) {
    return ErGroup.query().findById(erGroupId);
};

exports.getErGroup = async function (name, examRegulationsId) {
    const erGroupId = await ErGroup.query()
        .select(ErGroup.idColumn)
        .first()
        .where(ErGroup.nameColumn, name)
        .where(ErGroup.examRegulationsIdColumn, examRegulationsId);
    return erGroupId;
};

exports.createNewErGroup = function (erGroupData) {
    return ErGroup.query().insert(erGroupData);
};

exports.updateErGroup = async function (erGroupId, erGroupData) {
    const result = await ErGroup.query().findById(erGroupId).patch(erGroupData); //TODO: why async?
    return result;
};

exports.deleteErGroupById = function (erGroupId) {
    return ErGroup.query().deleteById(erGroupId);
};

exports.getNumberOfSemesters = async function (examRegulationsId) {
    const erGroups = await ErGroup.query()
        .withGraphFetched('modules')
        .modifyGraph('modules', (builder) => {
            builder.orderBy('semester', 'desc');
        })
        .where(ErGroup.examRegulationsIdColumn, examRegulationsId);

    let semester = 0;
    erGroups.forEach((erGroup) => {
        const currSemester = erGroup.modules[0].semester;
        semester = currSemester > semester ? currSemester : semester;
    });

    return { semester: semester };
};

//get courses
/* exports.getCourses = async function (examRegulationsId) {
  const erGroups = await ErGroup.query()
    .withGraphFetched("modules")
    .modifyGraph("modules", (builder) => {
      builder.withGraphFetched("courses");
    })
    .where(ErGroup.examRegulationsIdColumn, examRegulationsId);

  return erGroups;
}; */

exports.getCourses = async function (examRegulationsId) {
    const erGroups = await ErGroup.query()
        .withGraphFetched('modules')
        .modifyGraph('modules', (builder) => {
            builder.withGraphFetched('courses');
        });

    return erGroups;
};
