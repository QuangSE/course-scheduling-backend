const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class Major extends Model {
  static get tableName() {
    return tableName.MAJOR;
  }

  static get idColumn() {
    return "major_id";
  }

  static get nameColumn() {
    return "name";
  }

  static get degreeColumn() {
    return "degree";
  }


  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "degree"],

      properties: {
        name: { type: "string", maxLength: 200 },
        degree: { type: "string", maxLength: 50 },
      },
    };
  }

  
  static get relationMappings() {
    const MajorGroup = require("./erGroupModel");
    const CompulsoryModule = require("./compulsoryModuleModel");
    const Module = require("./ModuleModel");
    const ExamRegulations = require("./examRegulationsModel")
    return {
 
      //TODO: Check nestled "through" mappings for retrieving all modules of a major



      compulsoryModules: {
        relation: Model.ManyToManyRelation,
        modelClass: Module,
        join: {
          from: "major.major_id",
          through: {
            modelClass: CompulsoryModule,
            from: "compulsory_module.major_id",
            to: "compulsory_module.module_id",
          },
          to: "module.module_id",
        },
      },

      examRegulations: {
        relation: Model.HasManyRelation,
        modelClass: ExamRegulations,
        join: {
          from: "major.major_id",
          to: "exam_regulations.major_id", 
        }
      },

    };
  }
}

module.exports = Major;
