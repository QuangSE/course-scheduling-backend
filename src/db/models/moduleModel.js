const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class Module extends Model {
  static get tableName() {
    return tableName.MODULE;
  }

  static get idColumn() {
    return 'module_id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get semesterColumn() {
    return 'semester';
  }

  static get swsColumn() {
    return 'sws';
  }

  static get visibilityColumn() {
    return 'visibility';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'semester'],

      properties: {
        module_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 200 },
        semester: { type: 'integer', minimum: 1, maximum: 127 },
        sws: { type: ['integer', 'null'], minimum: 0, maximum: 127 },
        visibility: { type: ['integer', 'null'], minimum: 0, maximum: 2 },
      },
    };
  }

  static get relationMappings() {
    const Course = require('./courseModel');
    const CompulsoryModule = require('./compulsoryModuleModel');
    const ModuleErGroup = require('./moduleErGroupModel');
    const ErGroup = require('./erGroupModel');
    const Major = require('./majorModel');

    return {
      courses: {
        relation: Model.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'module.module_id',
          to: 'course.module_id',
        },
      },

      moduleErGroups: {
        relation: Model.HasManyRelation,
        modelClass: ModuleErGroup,
        join: {
          from: 'module.module_id',
          to: 'module_er_group.module_id',
        },
      },

      compulsoryModules: {
        relation: Model.HasManyRelation,
        modelClass: CompulsoryModule,
        join: {
          from: 'module.module_id',
          to: 'compulsory_module.module_id',
        },
      },

      ErGroups: {
        relation: Model.ManyToManyRelation,
        modelClass: ErGroup,
        join: {
          from: 'module.module_id',
          through: {
            ModelClass: ModuleErGroup,
            from: 'module_er_group.module_id',
            to: 'module_er_group.er_group_id',
          },
          to: 'er_group.er_group_id',
        },
      },

      compulsoryModuleMajors: {
        relation: Model.ManyToManyRelation,
        modelClass: Major,
        join: {
          from: 'module.module_id',
          through: {
            ModelClass: CompulsoryModule,
            from: 'compulsory_module.module_id',
            to: 'compulsory_module.major_id',
          },
          to: 'major.major_id',
        },
      },
    };

    //TODO: Check nestled "through" mappings for retrieving the major of the modules
  }
}

module.exports = Module;
