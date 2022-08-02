const Module = require('../db/models/moduleModel')

exports.getAllModules = function () {
    return Module.query()
}

exports.getModuleById = function (moduleId) {
    return Module.query().findById(moduleId)
}

exports.getModuleByNameSemester = function (name, semester) {
    return Module.query()
        .first()
        .where(Module.nameColumn, name)
        .where(Module.semesterColumn, semester)
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

exports.getCoursesWithModuleId = async function (moduleId) {
    const module = await Module.query().withGraphFetched('courses').findById(moduleId)
    return module ? module.courses : null
}
