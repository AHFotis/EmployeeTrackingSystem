const connection = require("./connection");
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const addfuncs = require("./addfuncs");
const viewfuncs = require("./viewfuncs");
const chalk = require('chalk');

//function to delete a department
function deleteDepartment() {
    connection.query(
        "SELECT name FROM department",
        function (err, res) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "department",
                    type: "list",
                    choices: function () {

                        return res.map((department) => ({
                            name: department.name

                        }));

                    },
                    message: "Please select the department you would like to delete."
                }
            ]).then((response) => {
                dept = response.department
                connection.query(
                    "DELETE FROM department WHERE name = '" + dept + "'",
                    function (err, res) {
                        if (err) throw err;
                        console.log(chalk.green("Department Successfully Deleted!"))
                        deleteReroute();
                    })
            })
        })
}

//function to delete a role
function deleteRole() {
    let delRoleArray = [];
    connection.query(
        "SELECT title FROM roles",
        function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                delRoleArray.push(res[i].title)
            }
            inquirer.prompt([
                {
                    name: "role",
                    type: "list",
                    choices: delRoleArray,
                    message: "Please select the role you would like to delete."
                }
            ]).then((response) => {
                var role = response.role
                connection.query(
                    "DELETE FROM roles WHERE title = '" + role + "'",
                    function (err, res) {
                        if (err) throw err;
                        console.log(chalk.green("Role Successfully Deleted!"))
                        deleteReroute();
                    })
            })
        })

}

//function to delete and employee
function deleteEmployee() {
    connection.query(
        "SELECT first_name, last_name FROM employee",
        function (err, res) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    choices: function () {

                        return res.map((employee) => ({
                            name: employee.first_name + " " + employee.last_name

                        }));

                    },
                    message: "Please select the employee you would like to delete."
                }
            ]).then((response) => {
                let empArray = response.employee.split(" ");
                connection.query(
                    "DELETE FROM employee WHERE first_name = '" + empArray[0] + "' AND last_name = '" + empArray[1] + "'",
                    function (err, res) {
                        if (err) throw err;
                        console.log(chalk.green("Employee Successfully Deleted!"))
                        deleteReroute();
                    })
            })
        })

}

//delete page reroute
function deleteReroute() {
    inquirer.prompt(prompts)
        .then((response) => {
            if (response.main == 'View All Employees') {
                viewfuncs.viewAll();
            } else if (response.main == 'View Employees by Department') {
                viewfuncs.viewDept();
            } else if (response.main == "View Employees by Role") {
                viewfuncs.viewRole();
            } else if (response.main == "View Employees by Manager") {
                viewfuncs.viewManager();
            } else if (response.main == "View Utilized Budget Per Department") {
                viewfuncs.viewBudget();
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
                deleteDepartment();
            } else if (response.main == "Delete Role") {
                deleteRole();
            } else if (response.main == "Delete Employee") {
                deleteEmployee();
            } else if (response.main == "Exit application") {
                console.log(chalk.yellow("Now leaving employee database..."))
                connection.end()
            } else {
                console.log(chalk.red("Invalid Option"))
            }

        })

} module.exports = {
    deleteDepartment,
    deleteRole,
    deleteEmployee
}