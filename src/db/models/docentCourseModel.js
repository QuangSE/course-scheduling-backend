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

  static get registeredColumn() {
    return "registered_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["docent_id", "course_id"],

      properties: {
        docent_course_id: { type: "integer" },
        docent_id: { type: "integer", minLength: 1 },
        course_id: { type: "integer", minLength: 1 },
        registered: { type: "integer"}
      },
    };
  }


  static get relationMappings() {
    const Course = require("./courseModel");
    const Docent = require("./docentModel");

    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: Course,
        join: {
          from: "docent_course.course_id",
          to: "course.course_id",
        },
      },
      docent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Docent,
        join: {
          from: "docent_course.docent_id",
          to: "docent.docent_id", 
        }
      }
    };
  }
}

module.exports = DocentCourse;
