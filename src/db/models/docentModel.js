const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class Docent extends Model {
  static get tableName() {
    return tableName.docent;
  }

  static get idColumn() {
    return "docent_id";
  }

  static get firstNameColumn() {
    return "first_name";
  }

  static get lastNameColumn() {
    return "last_name";
  }

  static get titleColumn() {
    return "title";
  }

  static get jobTypeColumn() {
    return "job_type";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name"],

      properties: {
        docent_id: { type: "integer" },
        first_name: { type: "string", minLength: 1, maxLength: 200 },
        last_name: { type: "string", maxLength: 200 },
        email: { type: "string", maxLength: 200 },
        title: { type: "string", maxLength: 100 },
        job_type: { type: "string", minLength: 1, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    const Course = require("./courseModel");
    const DocentCourse = require("./docentCourseModel");
    const User = require("./userModel");

    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: "docent.docent_id",
          through: {
            modelClass: DocentCourse,
            from: "docent_course.docent_id",
            to: "docent_course.course_id",
          },
          to: "course.course_id",
        },
      },
      user: {
        relation: Model.HasOneRelation, //TODO: can a docent has more than one account?
        modelClass: User,
        join: {
          from: "docent.docent_id",
          to: "user.docent_id",
        }
      }
    };
  }
}

module.exports = Docent;
