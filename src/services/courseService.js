const Course = require('../db/models/courseModel')

exports.getAllCourses = function () {
    return Course.query()
}

exports.getCourseById = function (courseId) {
    return Course.query().findById(courseId)
}

exports.createNewCourse = function (courseData) {
    return Course.query().insert(courseData)
}

exports.updateCourse = async function (courseId, courseData) {
    const result = await Course.query().findById(courseId).patch(courseData) //TODO: why async?
    return result
}

exports.deleteCourseById = function (courseId) {
    return Course.query().deleteById(courseId)
}
