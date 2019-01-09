const CONFIG = {
  HOST: 'localhost',
  PORT: 4000,
  DBUSER: 'postgres',
  DBPWD: null,
  DBNAME: 'subscription',
  DBPORT: 5432,
  DBHOST: '127.0.0.1'
}

module.exports = CONFIG;

/*

  CREATE TABLE post (
    id        SERIAL PRIMARY KEY,
    content   TEXT,
    author    VARCHAR(255)
  );

*/
