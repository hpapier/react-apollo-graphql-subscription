const CONFIG = {
  HOST: 'localhost',
  PORT: 4000,
  DBUSER: 'postgres',
  DBPWD: '',
  DBNAME: 'subscription',
  DBPORT: 5432,
  DBHOST: 'localhost'
}

module.exports = CONFIG;

/*

  CREATE TABLE post (
    id        SERIAL PRIMARY KEY,
    content   TEXT,
    author    VARCHAR(255)
  );

*/