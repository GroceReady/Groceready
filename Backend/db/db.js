var mysql = require('mysql');

var pool = mysql.createPool({
    host: "groceready.cbrml2sf20qq.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "groceready",
    port: "3306",
    database: "groceready",
    multipleStatements: true
});
module.exports = pool;

