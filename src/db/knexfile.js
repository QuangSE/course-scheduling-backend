/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.HOST,
            port: process.env.DB_PORT,
            user: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            database: process.env.DATABASE,
        },
        //pool: { min: 0, max: 7 } pooling
    },
};
