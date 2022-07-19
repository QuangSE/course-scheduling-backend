const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class MajorGroup extends Model {
  static get tableName() {
    return tableName.major_group;
  }

  static get idColumn() {
    return "major_group_id";
  }

  static get nameColumn() {
    return "name";
  }

  static get majorIdColumn() {
    return "major_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "major_id"],

      properties: {
        name: { type: "string", maxLength: 200 },
        major_id: { type: "integer", minLength: 1 },
      },
    };
  }

  //TODO: add relationshipMappings
  static get relationMappings() {
    const Module = require("./moduleModel");
    const ModuleMajorGroup = require("./moduleMajorGroupModel");
    const Major = require("./majorModel")
    return {
      modules: {
        relation: Model.ManyToManyRelation,
        modelClass: Module,
        join: {
          from: "major_group.major_group.id",
          through: {
            modelClass: ModuleMajorGroup,
            from: "module_major_group.major_group.id",
            to: "module_major_group.module_id",
          },
          to: "module.module_id",
        },
      },

      moduleMajorGroups: {
        relation: Model.HasManyRelation,
        modelClass: ModuleMajorGroup,
        join: {
          from: "major_group.major_group_id",
          to: "module_major_group.major_group_id",
        },
      },

      major: {
        relation: Model.BelongsToOneRelation,
        modelClass: Major,
        join: {
          from: "major_group.major_id",
          to: "major.major_id",
        },
      },
    };
  }
}

module.exports = MajorGroup;
