const connection = require("./connection")
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const addfuncs = require("./addfuncs")

function viewAll () {
    connection.query(
        "SELECT empid, first_name, last_name, name, title, salary FROM employee LEFT JOIN roles ON roles.roleid = employee.role_id LEFT JOIN department ON department.deptid = roles.department_id",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            viewReroute() ;
        })
    }

function viewDept () {
    connection.query(
        "SELECT deptid, name, first_name, last_name, title, salary FROM department LEFT JOIN roles ON department.deptid = roles.department_id LEFT JOIN employee ON roles.roleid = employee.role_id ORDER BY name",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

function viewRole () {
    connection.query(
        "SELECT title, first_name, last_name, salary, name FROM roles LEFT JOIN department ON roles.dept_id = department.deptid LEFT JOIN employee ON roles.roleid = employee.role_id ORDER BY title",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

function viewManager () {
    connection.query(
        "SELECT e.first_name employee_first, e.last_name  employee_last, m.first_name manager_first, m.last_name manager_last FROM employee e INNER JOIN employee m ON m.empid = e.manager_id",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

function viewBudget () {
    connection.query(
        "SELECT name as DeptName, SUM(salary) as DeptBudget FROM roles INNER JOIN department ON roles.department_id = department.deptid GROUP BY name",
        function(err, res) {
          if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

function viewReroute() {
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
    }else if (response.main == "View Utilized Budget Per Department") {
        viewBudget();
    }else if (response.main == "Add a Department") {
        addfuncs.addDept();
    } else if (response.main == "Add a Role") {
        addfuncs.addRole();
    }else if (response.main == "Add an Employee") {
        addfuncs.addEmployee();
    }else if (response.main == "Update an Employee's Role") {
        addfuncs.updateEmpRole();
    }else if (response.main == "Update an Employee's Manager") {
        addfuncs.updateManager();
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
    viewBudget
}