const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class Module extends Model {
  static get tableName() {
    return tableName.module;
  }

  static get idColumn() {
    return "module_id";
  }

  static get nameColumn() {
    return "name";
  }

  static get semesterColumn() {
    return "semester";
  }

  static get swsColumn() {
    return "sws";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "semester", "sws"],

      properties: {
        module_id: { type: "number" },
        name: { type: "string", minLength: 1, maxLength: 100 },
        semester: { type: "number", minLength: 1, maxLength: 15 },
        name: { type: "string", minLength: 1, maxLength: 45 },
      },
    };
  }

  //TODO: add relationshipMappings
  static get relationshipMappings() {}
}

module.exports = Module;
