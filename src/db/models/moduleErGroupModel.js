const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class ModuleErGroup extends Model {
    static get tableName() {
        return tableName.MODULE_ER_GROUP;
    }

    static get idColumn() {
        return 'module_er_group_id';
    }

    static get erGroupIdColumn() {
        return 'er_group_id';
    }

    static get moduleIdColumn() {
        return 'module_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['er_group_id', 'module_id'],

            properties: {
                module_er_group_id: { type: 'integer' },
                er_group_id: { type: 'integer', minLength: 1 },
                module_id: { type: 'integer', minLength: 1 },
            },
        };
    }

    static get relationMappings() {
        const erGroup = require('./erGroupModel');
        const Module = require('./moduleModel');
        return {
            erGroup: {
                relation: Model.BelongsToOneRelation,
                modelClass: erGroup,
                join: {
                    from: 'module_er_group.er_group_id',
                    to: 'er_group.er_group_id',
                },
            },

            module: {
                relation: Model.BelongsToOneRelation,
                modelClass: Module,
                join: {
                    from: 'module_er_group.module_id',
                    to: 'module.module_id',
                },
            },
        };
    }
}

module.exports = ModuleErGroup;
