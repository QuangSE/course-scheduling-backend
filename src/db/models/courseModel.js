const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class Course extends Model {
  static get tableName() {
    return tableName.course;
  }

  static get idColumn() {
    return "course_id";
  }

  static get nameColumn() {
    return "name";
  }

  static get swsColumn() {
    return "sws";
  }

  static get lswsColumn() {
    return "lsws";
  }

  static get moduleIdColumn() {
    return "module_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "lsws", "module_id"],

      properties: {
        course_id: { type: "number" },
        name: { type: "string", minLength: 1, maxLength: 150 },
        lsws: { type: "string", minLength: 1, maxLength: 64 },
        module_id: { type: "number", minLength: 1 },
      },
    };
  }

  //TODO: add relationshipMappings
  static get relationshipMappings() {}
}

module.exports = Course;
