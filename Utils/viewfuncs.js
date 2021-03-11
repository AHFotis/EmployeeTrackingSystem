const connection = require("./connection");
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const addfuncs = require("./addfuncs");
const delfuncs = require("./deletefuncs");
const chalk = require('chalk');

//function to view all employees
function viewAll() {
    connection.query(
        "SELECT e.empid as ID, CONCAT(e.first_name, ' ', e.last_name) as Employee, name as Department, title as Title, salary as Salary,  CONCAT(m.first_name, ' ', m.last_name) as Manager FROM employee e LEFT JOIN roles ON roles.roleid = e.role_id LEFT JOIN department ON department.deptid = roles.department_id LEFT JOIN employee m ON m.empid = e.manager_id ORDER BY e.empid",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

//function to view employees by department
function viewDept() {
    connection.query(
        "SELECT deptid as DeptId, name as Department, CONCAT(e.first_name, ' ', e.last_name) as Employee, title as Title, salary as Salary, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM department LEFT JOIN roles ON department.deptid = roles.department_id LEFT JOIN employee e ON roles.roleid = e.role_id LEFT JOIN employee m ON m.empid = e.manager_id ORDER BY deptid",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

//function to view employees by role
function viewRole() {
    connection.query(
        "SELECT title as Title, CONCAT(e.first_name, ' ', e.last_name) as Employee, salary as Salary, name as Department, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM roles LEFT JOIN department ON roles.department_id = department.deptid LEFT JOIN employee e ON roles.roleid = e.role_id LEFT JOIN employee m ON m.empid = e.manager_id ORDER BY title",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

//function to view employees by manager
function viewManager() {
    connection.query(
        "SELECT CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', title as EmployeeTitle, salary as Salary, name as Department FROM employee e LEFT JOIN roles ON roles.roleid = e.role_id LEFT JOIN department ON department.deptid = roles.department_id INNER JOIN employee m ON m.empid = e.manager_id ORDER BY manager",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

//function to view utilized budgets
function viewBudget() {
    connection.query(
        "SELECT name as DeptName, SUM(salary) as DeptBudget FROM roles INNER JOIN department ON roles.department_id = department.deptid GROUP BY name",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            viewReroute();
        })
}

//reroute function
function viewReroute() {
    inquirer.prompt(prompts)
        .then((response) => {
            if (response.main == 'View All Employees') {
                viewAll();
            } else if (response.main == 'View Employees by Department') {
                viewDept();
            } else if (response.main == "View Employees by Role") {
                viewRole();
            } else if (response.main == "View Employees by Manager") {
                viewManager();
            } else if (response.main == "View Utilized Budget Per Department") {
                viewBudget();
            } else if (response.main == "Add a Department") {
                addfuncs.addDept();
            } else if (response.main == "Add a Role") {
                addfuncs.addRole();
            } else if (response.main == "Add an Employee") {
                addfuncs.addEmployee();
            } else if (response.main == "Update an Employee's Role") {
                addfuncs.updateEmpRole();
            } else if (response.main == "Update an Employee's Manager") {
                addfuncs.updateManager();
            } else if (response.main == "Delete Department") {
                delfuncs.deleteDepartment();
            } else if (response.main == "Delete Role") {
                delfuncs.deleteRole();
            }else if (response.main == "Delete Employee") {
                delfuncs.deleteEmployee();
            }else if (response.main == "Exit application") {
                console.log(chalk.yellow("Now leaving employee database..."))
                connection.end()
            }else {
                console.log(chalk.red("Invalid Option"))
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