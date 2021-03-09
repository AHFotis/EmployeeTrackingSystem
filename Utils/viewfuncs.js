const connection = require("./connection")
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompts");

function viewAll () {
    connection.query(
        "SELECT empid, first_name, last_name, name, title, salary FROM employee LEFT JOIN roles ON roles.roleid = employee.role_id LEFT JOIN department ON department.deptid = roles.department_id",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
        })
    }

function viewDept () {
    connection.query(
        "SELECT name, first_name, last_name, title FROM department LEFT JOIN roles ON department.deptid = roles.department_id LEFT JOIN employee ON roles.roleid = employee.role_id ORDER BY name",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
        })
}

function viewRole () {
    connection.query(
        "SELECT title, first_name, last_name FROM roles LEFT JOIN employee ON roles.roleid = employee.role_id ORDER BY title",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
        })
}

function viewManager () {
    connection.query(
        "SELECT e.first_name employee_first, e.last_name  employee_last, m.first_name manager_first, m.last_name manager_last FROM employee e INNER JOIN employee m ON m.empid = e.manager_id",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            reroute();
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
     } else if (response.main == "View Employees by Manager") {
        viewManager();
    }else if (response.main == "Add a Department") {
        addDept();
    } else if (response.main == "Add a Role") {
        addRole();
    }else if (response.main == "Add an Employee") {
        addEmployee();
    }else if (response.main == "Update an Employee's Role") {
        updateEmpRole();
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
    viewManager, 
}