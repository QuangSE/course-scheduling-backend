const Module = require('../db/models/moduleModel')

/* reqData 
{
  majorName: "major_name",
  degree: "degree",

  examRegulationsYear: "exam_regulations_year
  erGroupName: "er_group_name",

  moduleName: "module_name",
  semester: "semester",
  sws: "sws",
  visibility: "visibility",

  course

} 

*/

exports.importModules = function (reqData) {
    return Module.query().insert(moduleData)
}

exports.getModuleById = function (moduleId) {
    return Module.query().findById(moduleId)
}

exports.createNewModule = function (moduleData) {
    return Module.query().insert(moduleData)
}

exports.updateModule = async function (moduleId, moduleData) {
    const result = await Module.query().findById(moduleId).patch(moduleData) //TODO: why async?
    return result
}

exports.deleteModuleById = function (moduleId) {
    return Module.query().deleteById(moduleId)
}
