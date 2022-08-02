const Model = require('objection').Model;
const tableName = require('../../util/constants/tableNames');

class Course extends Model {
    static get tableName() {
        return tableName.COURSE;
    }

    static get idColumn() {
        return 'course_id';
    }

    static get nameColumn() {
        return 'name';
    }

    static get swsColumn() {
        return 'sws';
    }

    static get lswsColumn() {
        return 'lsws';
    }

    static get moduleIdColumn() {
        return 'module_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'lsws', 'module_id'],

            properties: {
                course_id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 200 },
                lsws: { type: 'number', minimum: 0, maximum: 64 }, //FIXME: float validation is fucking up the system
                module_id: { type: 'integer', minLength: 1 },
            },
        };
    }


    static get relationMappings() {
        const Docent = require('./docentModel');
        const DocentCourse = require('./docentCourseModel');
        const Module = require('./moduleModel');
        return {
            docents: {
                relation: Model.ManyToManyRelation,
                modelClass: Docent,
                join: {
                    from: 'course.docent_id',
                    through: {
                        modelClass: DocentCourse,
                        from: 'docent_course.docent_id',
                        to: 'docent_course.course_id',
                    },
                    to: 'docent.docent_id',
                },
            },

            docentCourses: {
                relation: Model.HasManyRelation,
                modelClass: DocentCourse,
                join: {
                    from: 'course.course_id',
                    to: 'docent_course.course_id',
                },
            },

            module: {
                relation: Model.BelongsToOneRelation,
                modelClass: Module,
                join: {
                    from: 'course.module_id',
                    to: 'module.module_id',
                },
            },
        };
    }
}

module.exports = Course;
