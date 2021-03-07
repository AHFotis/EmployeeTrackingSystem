const connection = require("./connection")
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompts");

function viewAll () {
    connection.query(
        "SELECT empid, first_name, last_name, name, title, salary FROM employee LEFT JOIN role ON role.roleid = employee.role_id LEFT JOIN department ON department.deptid = role.department_id",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
        })
    }

function viewDept () {
    connection.query(
        "SELECT name, first_name, last_name, title FROM department LEFT JOIN role ON department.deptid = role.department_id LEFT JOIN employee ON role.roleid = employee.role_id ORDER BY name",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
        })
}

function viewRole () {
    connection.query(
        "SELECT title, first_name, last_name FROM role LEFT JOIN employee ON role.roleid = employee.role_id ORDER BY title",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
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
            reroute();
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
            reroute();
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
            reroute();
        })
    })
}

function reroute() {
    inquirer.prompt(prompts)
.then((response) => {
     if (response.main == 'View All Employees') {
        viewAll();
     }else if (response.main == 'View Employees by Department') {
         viewDept();
     } else if (response.main == "View Employees by Role") {
         viewRole();
     } else if (response.main == "Add a Department") {
        addDept();
    } else if (response.main == "Add a Role") {
        addRole();
    }else if (response.main == "Add an Employee") {
        addEmployee();
    }else if (response.main == "Exit application") {
        console.log("Now leaving employee database...")
        connection.end()
    } else {
         console.log("not yet")
     }
    
})
   
}    




module.exports = {
    viewAll,
    viewDept,
    viewRole,
    addDept,
    addRole,
    addEmployee,
}