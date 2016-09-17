var mysql = require('mysql');
var connection = null;
var dbHelper = function (opt) {
    connection = mysql.createConnection({
        host: 'localhost' || opt.ip,
        user: 'root' || opt.user,
        password: 'root' || opt.pwd,
        database: "sakila",
        port: 3306
    });
    return dbHelper;
};
dbHelper();
dbHelper.query = function (sql) {
    var result;
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err;
        result = rows[0].solution;
        rows.forEach(function(i,r){
            console.log('The result is: ', JSON.stringify(i));
        });
        connection.end();
    });

    return result;
};
module.exports = dbHelper;