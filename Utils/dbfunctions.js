const connection = require("./connection")
var mysql = require("mysql");

function viewAll () {
    connection.query(
        "SELECT empid, first_name, last_name, name, title, salary FROM employee LEFT JOIN role ON role.roleid = employee.empid LEFT JOIN department ON department.deptid = role.department_id",
        function(err, res) {
          if (err) throw err;
            console.table(res)
        })
    }

function viewDept () {
    connection.query(
        "SELECT name, first_name, last_name, title FROM employee LEFT JOIN role ON role.roleid = employee.role_id LEFT JOIN department ON department.deptid = role.department_id ORDER BY name",
        function(err, res) {
          if (err) throw err;
            console.table(res)
        })
}

function viewRole () {
    connection.query(
        "SELECT title, first_name, last_name FROM role LEFT JOIN employee ON role.roleid = employee.role_id ORDER BY title",
        function(err, res) {
          if (err) throw err;
            console.table(res)
        })
}

module.exports = {
    viewAll,
    viewDept,
    viewRole
}