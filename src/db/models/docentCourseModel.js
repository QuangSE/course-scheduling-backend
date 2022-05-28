const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class DocentCourse extends Model {
  static get tableName() {
    return tableName.docent_course;
  }

  static get idColumn() {
    return "docent_course_id";
  }

  static get docentIdColumn() {
    return "docent_id";
  }

  static get courseColumn() {
    return "course_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["docent_id", "course_id"],

      properties: {
        docent_course_id: { type: "number" },
        docent_id: { type: "number", minLength: 1 },
        course_id: { type: "number", minLength: 1 },
      },
    };
  }

  //TODO: add relationshipMappings
  static get relationshipMappings() {}
}

docent_course.exports = DocentCourse;
