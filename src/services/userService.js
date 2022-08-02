const User = require('../db/models/userModel')
const Docent = require('../db/models/docentModel')

exports.getAllUsers = function () {
    return User.query()
}

exports.getUserById = function (userId) {
    return User.query().findById(userId)
}

exports.getUserByUsername = async function (username) {
    const user = await User.query().first().where('username', username)
    return user
}

exports.getDocentOfUser = async function (userId) {
    const docent = await User.query()
        .select('docent.*')
        .innerJoin('docent', 'user.docent_id', 'docent.docent_id')
        .where('user_Id', userId)
    return docent
}

exports.createNewUser = function (userData) {
    return User.query().insert(userData)
}

exports.updateUser = async function (userId, userData) {
    return User.query().findById(userId).patch(userData) //TODO: await?
}

exports.deleteUserById = function (userId) {
    return User.query().deleteById(userId)
}
