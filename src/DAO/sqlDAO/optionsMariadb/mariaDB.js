import knex from 'knex';

const mariaDBConfig = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : '',
      database : 'test'
    }
    });

export default mariaDBConfig;