const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class ErGroup extends Model {
    static get tableName() {
        return tableName.ER_GROUP;
    }

    static get idColumn() {
        return 'er_group_id';
    }

    static get nameColumn() {
        return 'name';
    }

    static get examRegulationsIdColumn() {
        return 'exam_regulations_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['exam_regulations_id'],

            properties: {
                name: { type: ['string', 'null'], maxLength: 200 },
                exam_regulations_id: { type: 'integer', minLength: 1 },
            },
        };
    }

    static get relationMappings() {
        const Module = require('./moduleModel');
        const ModuleErGroup = require('./moduleErGroupModel');
        const ExamRegulations = require('./examRegulationsModel');

        return {
            modules: {
                relation: Model.ManyToManyRelation,
                modelClass: Module,
                join: {
                    from: 'er_group.er_group_id',
                    through: {
                        modelClass: ModuleErGroup,
                        from: 'module_er_group.er_group_id',
                        to: 'module_er_group.module_id',
                    },
                    to: 'module.module_id',
                },
            },

            moduleErGroups: {
                relation: Model.HasManyRelation,
                modelClass: ModuleErGroup,
                join: {
                    from: 'er_group.er_group_id',
                    to: 'module_er_group.er_group_id',
                },
            },

            examRegulations: {
                relation: Model.BelongsToOneRelation,
                modelClass: ExamRegulations,
                join: {
                    from: 'er_group.exam_regulations_id',
                    to: 'exam_regulations.exam_regulations_id',
                },
            },
        };
    }
}

module.exports = ErGroup;
