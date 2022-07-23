const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class ErGroup extends Model {
  static get tableName() {
    return tableName.ER_GROUP;
  }

  static get idColumn() {
    return "er_Group_id";
  }

  static get nameColumn() {
    return "name";
  }

  static get examRegulationsIdColumn() {
    return "exam_rugulations_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "exam_rugulations_id"],

      properties: {
        name: { type: "string", maxLength: 200 },
        exam_rugulations_id: { type: "integer", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const Module = require("./moduleModel");
    const ModuleErGroup = require("./moduleErGroupModel");
    const Major = require("./majorModel")
    return {
      modules: {
        relation: Model.ManyToManyRelation,
        modelClass: Module,
        join: {
          from: "er_Group.er_Group.id",
          through: {
            modelClass: ModuleErGroup,
            from: "module_er_Group.er_Group.id",
            to: "module_er_Group.module_id",
          },
          to: "module.module_id",
        },
      },

      moduleErGroups: {
        relation: Model.HasManyRelation,
        modelClass: ModuleErGroup,
        join: {
          from: "er_Group.er_Group_id",
          to: "module_er_Group.er_Group_id",
        },
      },

   /*    major: {
        relation: Model.BelongsToOneRelation,
        modelClass: Major,
        join: {
          from: "er_Group.exam_rugulations_id",
          to: "major.exam_rugulations_id",
        },
      }, */
    };
  }
}

module.exports = ErGroup;