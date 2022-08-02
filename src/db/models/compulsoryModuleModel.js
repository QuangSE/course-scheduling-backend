const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class CompulsoryModule extends Model {
    static get tableName() {
        return tableName.COMPULSORY_MODULE;
    }

    static get idColumn() {
        return 'compulsory_module_id';
    }

    static get moduleIdColumn() {
        return 'module_id';
    }

    static get majorIdColumn() {
        return 'major_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['module_id', 'major_id'],

            properties: {
                compulsory_module_id: { type: 'integer' },
                module_id: { type: 'integer', minLength: 1 },
                major_id: { type: 'integer', minLength: 1 },
            },
        };
    }

    static get relationMappings() {
        const Major = require('./majorModel');
        const Module = require('./moduleModel');
        return {
            major: {
                relation: Model.BelongsToOneRelation,
                modelClass: Major,
                join: {
                    from: 'compulsory_module.major_id',
                    to: 'major.major_id',
                },
            },

            module: {
                relation: Model.BelongsToOneRelation,
                modelClass: Module,
                join: {
                    from: 'compulsory_module.module_id',
                    to: 'module.module_id',
                },
            },
        };
    }
}

module.exports = CompulsoryModule;
