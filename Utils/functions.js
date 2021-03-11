const connection = require("./connection");
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const chalk = require('chalk');

//function to view all employees
function viewAll() {
    connection.query(
        "SELECT e.empid as ID, CONCAT(e.first_name, ' ', e.last_name) as Employee, name as Department, title as Title, salary as Salary,  CONCAT(m.first_name, ' ', m.last_name) as Manager FROM employee e LEFT JOIN roles ON roles.roleid = e.role_id LEFT JOIN department ON department.deptid = roles.department_id LEFT JOIN employee m ON m.empid = e.manager_id ORDER BY e.empid",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            reroute();
        })
}

//function to view employees by department
function viewDept() {
    connection.query(
        "SELECT deptid as DeptId, name as Department, CONCAT(e.first_name, ' ', e.last_name) as Employee, title as Title, salary as Salary, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM department LEFT JOIN roles ON department.deptid = roles.department_id LEFT JOIN employee e ON roles.roleid = e.role_id LEFT JOIN employee m ON m.empid = e.manager_id ORDER BY deptid",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            reroute();
        })
}

//function to view employees by role
function viewRole() {
    connection.query(
        "SELECT title as Title, CONCAT(e.first_name, ' ', e.last_name) as Employee, salary as Salary, name as Department, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM roles LEFT JOIN department ON roles.department_id = department.deptid LEFT JOIN employee e ON roles.roleid = e.role_id LEFT JOIN employee m ON m.empid = e.manager_id ORDER BY title",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            reroute();
        })
}

//function to view employees by manager
function viewManager() {
    connection.query(
        "SELECT CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', title as EmployeeTitle, salary as Salary, name as Department FROM employee e LEFT JOIN roles ON roles.roleid = e.role_id LEFT JOIN department ON department.deptid = roles.department_id INNER JOIN employee m ON m.empid = e.manager_id ORDER BY manager",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            reroute();
        })
}

//function to view utilized budgets
function viewBudget() {
    connection.query(
        "SELECT name as DeptName, SUM(salary) as DeptBudget FROM roles INNER JOIN department ON roles.department_id = department.deptid GROUP BY name",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            reroute();
        })
}

//Function to add a department to database
function addDept() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: "Please type in the new department name.",
    }]).then((response) => {
        var dept = response.department
        connection.query(
            "INSERT INTO department (name) VALUES ('" + dept + "')",
            function (err, res) {
                if (err) throw err;
                console.log(chalk.green("Department Successfully Added!"))
                reroute();
            })
    })
}

//Function to add a role to the database
function addRole() {
    connection.query(
        "SELECT name FROM department",
        function (err, res) {
            if (err) throw err;
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
                name: "department",
                type: "list",
                choices: function () {

                    return res.map((department) => ({
                        name: department.name

                    }));

                },
                message: "Please select the department for this role."
            }
            ]).then((response) => {
                var role = response.role;
                var salary = response.salary;
                var dept = response.department;
                connection.query(
                    "INSERT INTO roles (title, salary, department_id) VALUES ('" + role + "', '" + salary + "', (select deptid from department where name = '" + dept + "'))",
                    function (err, res) {
                        if (err) throw err;
                        console.log(chalk.green("Role Successfully Added!"))
                        reroute();
                    })
            })
        })
}

//function to add an employee to the database
function addEmployee() {
    let roleArray = [];
    let managerArray = ["None"];
    connection.query(
        "SELECT title FROM roles",
        function (err, res) {
            for (var i = 0; i < res.length; i++) {
                roleArray.push(res[i].title)
            }
            if (err) throw err;
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
            {
                type: 'list',
                name: 'role',
                choices: roleArray,
                message: "Please chose this employee's role.",
            },

            ]).then((response) => {
                var first = response.first;
                var last = response.last;
                var role = response.role;
                connection.query(
                    "SELECT title FROM roles WHERE title LIKE '%Manager%'",
                    function (err, res) {
                        for (var i = 0; i < res.length; i++) {
                            managerArray.push(res[i].title)
                        }
                        if (err) throw err;
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                choices: managerArray,
                                message: "Please chose this employee's manager.",
                            },
                        ]).then((response) => {
                            let manager = response.manager
                            if (manager == "None") {
                                connection.query(
                                "INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + first + "', '" + last + "', (select roleid from roles where title = '" + role + "'))",
                                function (err, res) {
                                    if (err) throw err;
                                    roleArray = [];
                                    managerArray = ["None"];
                                    console.log(chalk.green("Employee Successfully Added!"))
                                    reroute()

                                })
                            }else {
                            connection.query(
                                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + first + "', '" + last + "', (select roleid from roles where title = '" + role + "'), (select roleid from roles where title = '" + manager + "'))",
                                function (err, res) {
                                    if (err) throw err;
                                    roleArray = [];
                                    managerArray = ["None"];
                                    console.log(chalk.green("Employee Successfully Added!"))
                                    reroute()

                                })
                            }
                        })

                    })
            })
        })
}

//function to update an employee's role
function updateEmpRole() {
    let newRoleArray = [];
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
                    message: "Please select the employee you wish to update"
                }
            ]).then((response) => {
                let nameArray = response.employee.split(" ");
                connection.query(
                    "SELECT title FROM roles",
                    function (err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            newRoleArray.push(res[i].title)
                        }
                        inquirer.prompt([

                            {
                                name: "role",
                                type: "list",
                                choices: newRoleArray,
                                message: "Please select this employee's new role."
                            }
                        ]).then((response) => {
                            var firstN = nameArray[0];
                            var lastN = nameArray[1];
                            var newRole = response.role;

                            connection.query(
                                "UPDATE employee SET role_id = (select roleid from roles where title = '" + newRole + "') WHERE first_name = '" + firstN + "' AND last_name = '" + lastN + "'",
                                function (err, res) {
                                    if (err) throw err;
                                    newRoleArray = [];
                                    console.log(chalk.green("Employee Successfully Updated!"))
                                    reroute();
                                })
                        })
                    })
            })
        })
}

//function to update an employee's manager
function updateManager() {
    let updateManArray = [];
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
                    message: "Please select the employee you wish to update"
                }
            ]).then((response) => {
                let nameArray = response.employee.split(" ");
                connection.query(
                    "SELECT title FROM roles WHERE title LIKE '%Manager%'",
                    function (err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            updateManArray.push(res[i].title)
                        }
                        inquirer.prompt([

                            {
                                name: "manager",
                                type: "list",
                                choices: updateManArray,
                                message: "Please select this employee's new manager."
                            }
                        ]).then((response) => {
                            var empFirstN = nameArray[0];
                            var empLastN = nameArray[1];
                            var newMan = response.manager;

                            connection.query(
                                "UPDATE employee SET manager_id = (select roleid from roles where title = '" + newMan + "') WHERE first_name = '" + empFirstN + "' AND last_name = '" + empLastN + "'",
                                function (err, res) {
                                    if (err) throw err;
                                    updateManArray = [];
                                    console.log(chalk.green("Manager Successfully Updated!"))
                                    reroute();
                                })
                        })
                    })
            })
        })
}

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
                        reroute();
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
                        reroute();
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
                        reroute();
                    })
            })
        })

}

//reroute function
function reroute() {
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
                addDept();
            } else if (response.main == "Add a Role") {
                addRole();
            } else if (response.main == "Add an Employee") {
                addEmployee();
            } else if (response.main == "Update an Employee's Role") {
                updateEmpRole();
            } else if (response.main == "Update an Employee's Manager") {
                updateManager();
            } else if (response.main == "Delete Department") {
                deleteDepartment();
            } else if (response.main == "Delete Role") {
                deleteRole();
            }else if (response.main == "Delete Employee") {
                deleteEmployee();
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
    viewBudget,
    addDept,
    addRole,
    addEmployee,
    updateEmpRole,
    updateManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    reroute
}