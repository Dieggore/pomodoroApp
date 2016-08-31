module.exports = {
    development:{
        debugger: true,
        client: 'pg',
        connection: {
            database: 'pomodoroDB'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'knex_migrations'
        }
    },
    stage: {
        client: 'pg',
        connection: {
            database: 'pomodoroDB'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'knex_migrations'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.PG_CONNECTION_STRING
    }
};
