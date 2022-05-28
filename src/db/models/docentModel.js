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

  static get professionColumn() {
    return "profession";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name"],

      properties: {
        docent_id: { type: "number" },
        first_name: { type: "string", minLength: 1, maxLength: 45 },
        last_name: { type: "string", minLength: 1, maxLength: 45 },
        email: { type: "string", maxLength: 150 },
        title: { type: "string", minLength: 1, maxLength: 45 },
        profession: { type: "string", minLength: 1, maxLength: 45 },
      },
    };
  }

  //TODO: Check if relationship mappings needs to be implemented redundantly
  static get relationMappings() {
    const Course = require("./courseModel");
    const DocentCourse = require("./DocentCourseModel");

    return {
      courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: "docent.docent_id",
          through: {
            modelClass: DocentCourse,
            from: "docent_course.personId",
            to: "docent_course.movieId",
          },
          to: "courses.id",
        },
      },
    };
  }
}

module.exports = Docent;
