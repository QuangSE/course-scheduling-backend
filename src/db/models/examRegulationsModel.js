const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class ExamRegulations extends Model {
  static get tableName() {
    return tableName.EXAM_REGULATIONS;
  }

  static get idColumn() {
    return 'exam_regulations_id';
  }

  static get yearColumn() {
    return 'year';
  }

  static get majorIdColumn() {
    return 'major_id';
  }

  static get examRegulationsGroupColumn() {
    return 'major_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['year', 'major_id'],

      properties: {
        exam_regulations_id: { type: 'integer' },
        year: { type: 'integer', minLength: 4, maxLength: 4 },
        exam_regulations_group: { type: ['string', 'null'], maxLength: 50 },
        major_id: { type: 'integer', minLength: 1 },
      },
    };
  }

  static get relationMappings() {
    const Major = require('./majorModel');
    const ErGroup = require('./erGroupModel');
    return {
      major: {
        relation: Model.BelongsToOneRelation,
        modelClass: Major,
        join: {
          from: 'exam_regulations.major_id',
          to: 'major.major_id',
        },
      },

      erGroups: {
        relation: Model.HasManyRelation,
        modelClass: ErGroup,
        join: {
          from: 'exam_regulations.exam_regulations_id',
          to: 'er_group.exam_regulations_id',
        },
      },
    };
  }
}

module.exports = ExamRegulations;
