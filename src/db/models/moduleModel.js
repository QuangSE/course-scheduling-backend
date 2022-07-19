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

  static get visibilityColumn() {
    return "visibility";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "semester", "sws"],

      properties: {
        module_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 200 },
        semester: { type: "integer", minLength: 1, maxLength: 15 },
        sws: { type: "integer", minLength: 1, maxLength: 100 },
        visibility: { type: "integer", minLength: 1, maxLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const Course = require("./courseModel");
    const CompusolryModule = require("./compusolryModuleModel");
    const ModuleMajorGroup = require("./moduleMajorGroupModel");
    const MajorGroup = require("./majorGroupModel");
    const Major = require("./majorModel");

    return {
      courses: {
        relation: Model.HasManyRelation,
        modelClass: Course,
        join: {
          from: "module.module_id",
          to: "course.module_id",
        },
      },

      moduleMajorGroups: {
        relation: Model.HasManyRelation,
        modelClass: ModuleMajorGroup,
        join: {
          from: "module.module_id",
          to: "module_major_group.module_id",
        },
      },

      compulsoryModules: {
        relation: Model.HasManyRelation,
        modelClass: CompusolryModule,
        join: {
          from: "module.module_id",
          to: "compulsory_module.module_id",
        },
      },

      majorGroups: {
        relation: Model.ManyToManyRelation,
        modelClass: MajorGroup,
        join: {
          from: "module.module_id",
          through: {
            ModelClass: ModuleMajorGroup,
            from: "module_major_group.module_id",
            to: "module_major_group.major_group_id",
          },
          to: "major_group.major_group_id",
        },
      },

      compulsoryModuleMajors: {
        relation: Model.ManyToManyRelation,
        modelClass: Major,
        join: {
          from: "module.module_id",
          through: {
            ModelClass: CompusolryModule,
            from: "compulsory_module.module_id",
            to: "compulsory_module.major_id",
          },
          to: "major.major_id",
        },
      },
    };

    //TODO: Check nestled "through" mappings for retrieving the major of the modules
  }
}

module.exports = Module;