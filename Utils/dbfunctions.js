const connection = require("./connection")
var mysql = require("mysql");
const inquirer = require("inquirer");

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
        "SELECT name, first_name, last_name, title FROM department LEFT JOIN role ON department.deptid = role.department_id LEFT JOIN employee ON role.roleid = employee.role_id ORDER BY name",
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

function addDept () {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: "Please type in the new department name.",
    }]).then((response) => {
        var dept = response.department
        connection.query(
            "INSERT INTO department (name) VALUES ('" + dept + "')",
            function(err, res) {
            if (err) throw err;
            console.log("Department Successfully Added!")
        })
    })
}

function addRole () {
    inquirer.prompt([{
        type: 'input',
        name: 'role',
        message: "Please type in the new role.",
    },
    {
        type: 'input',
        name: 'salary',
        message: "Please type in this role's salary.",
    },
    {
        type: 'input',
        name: 'dept',
        message: "Please type in this role's department number."
    }
]).then((response) => {
        var role = response.role;
        var salary = response.salary;
        // var dept = response.dept;
        connection.query(
            "INSERT INTO role (title, salary) VALUES ('" + role + "', '" + salary + "')",
            function(err, res) {
            if (err) throw err;
            console.log("Role Successfully Added!")
        })
    })
}

function addEmployee () {
    inquirer.prompt([{
        type: 'input',
        name: 'first',
        message: "Please type in the new employee's first name.",
    },
    {
        type: 'input',
        name: 'last',
        message: "Please type in the new employee's last name.",
    },
]).then((response) => {
        var first = response.first;
        var last = response.last;
        // var dept = response.dept;
        connection.query(
            "INSERT INTO employee (first_name, last_name) VALUES ('" + first + "', '" + last + "')",
            function(err, res) {
            if (err) throw err;
            console.log("Role Successfully Added!")
        })
    })
}

module.exports = {
    viewAll,
    viewDept,
    viewRole,
    addDept,
    addRole,
    addEmployee
}