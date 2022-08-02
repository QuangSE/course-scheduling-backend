const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class Permission extends Model {
  static get tableName() {
    return tableName.PERMISSION;
  }

  static get idColumn() {
    return 'permission_id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get descriptionColumn() {
    return 'description';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        permission_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 200 },
        description: { type: ['string', 'null'], minLength: 0, maxLength: 255 },
      },
    };
  }

  //TODO: check syntax for model properties
  static get relationshipMappings() {
    const User = require('./userModel');

    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'permission.permission_id',
          to: 'user.permission_id',
        },
      },
    };
  }
}

module.exports = Permission;
