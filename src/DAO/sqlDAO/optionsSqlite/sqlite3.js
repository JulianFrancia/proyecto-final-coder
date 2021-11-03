import knex from 'knex';

const sqliteConfig = knex({
        client: 'sqlite3',
        connection: {
        filename: "./dbmydb.sqlite"
        },
        useNullAsDefault: true
    });

export default sqliteConfig;