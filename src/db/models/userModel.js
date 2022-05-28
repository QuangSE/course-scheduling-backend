const Model = require("objection").Model;

const tableName = require("../../util/constants/tableNames");

class User extends Model {
  static get tableName() {
    return tableName.user;
  }

  static get idColumn() {
    return "user_id";
  }

  static get usernameColumn() {
    return "username";
  }

  static get passwordColumn() {
    return "password";
  }

  static get permissionIdColumn() {
    return "permission_id";
  }

  static get docentIdColumn() {
    return "docent_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password", "permission_id", "docent_id"],

      properties: {
        user_id: { type: "number" },
        username: { type: "string", minLength: 1, maxLength: 100 },
        password: { type: "string", minLength: 6, maxLength: 100 }, //TODO: hashing password + password requirements
        permission_id: { type: "number", minLength: 1 },
        docent_id: { type: "number", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const Docent = require("./docentModel");

    return {
      docent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Docent,
        join: {
          from: "user.docent_id",
          to: "docent.docent_id",
        },
      },
    }
  }
}

user.exports = User;
