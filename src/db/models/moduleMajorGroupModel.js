const Model = require("objection").Model;
const tableName = require("../../util/constants/tableNames");

class ModuleMajorGroup extends Model {
  static get tableName() {
    return tableName.module_major_group;
  }

  static get idColumn() {
    return "module_major_group_id";
  }

  static get majorGroupIdColumn() {
    return "major_group_id";
  }

  static get moduleIdColumn() {
    return "module_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["major_group", "module_id"],

      properties: {
        module_major_group_id: { type: "integer" },
        major_group_id: { type: "integer", minLength: 1 },
        module_id: { type: "integer", minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const MajorGroup = require("./majorGroupModel");
    const Module = require("./moduleModel");
    return {
      majorGroup: {
        relation: Model.BelongsToOneRelation,
        modelClass: MajorGroup,
        join: {
          from: "module_major_group.major_group_id",
          to: "major_group.major_group_id",
        },
      },

      module: {
        relation: Model.BelongsToOneRelation,
        modelClass: Module,
        join: {
          from: "module_major_group.module_id",
          to: "module.module_id",
        },
      },
    };
  }
}

module.exports = ModuleMajorGroup;
