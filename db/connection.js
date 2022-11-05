const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gma12GtZ(88)/6Gwp',
  database: 'employees_db'
});

module.exports = db;
