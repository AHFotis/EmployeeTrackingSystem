const connection = require("./connection")
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const viewfuncs = require("./viewfuncs")


//Function to add a department to the database
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
                console.log("Department Successfully Added!")
                addReroute();
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
                        console.log("Role Successfully Added!")
                        addReroute();
                    })
            })
        })
}

//function to add an employee to the database
function addEmployee() {
    let roleArray = [];
    let managerArray = [];
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

                            connection.query(
                                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + first + "', '" + last + "', (select roleid from roles where title = '" + role + "'), (select roleid from roles where title = '" + manager + "'))",
                                function (err, res) {
                                    if (err) throw err;
                                    roleArray = [];
                                    managerArray = [];
                                    console.log("Role Successfully Added!")
                                    addReroute()

                                })
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
                                    console.log("Employee Successfully Updated!")
                                    addReroute();
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
                                    console.log("Manager Successfully Updated!")
                                    addReroute();
                                })
                        })
                    })
            })
        })
}

//function to go back to menu when task is completed.
function addReroute() {
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
            }else if (response.main == "View Utilized Budget Per Department") {
                viewfuncs.viewBudget();
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
            } else if (response.main == "Exit application") {
                console.log("Now leaving employee database...")
                connection.end()
            }


        })

}
module.exports = {

    addDept,
    addRole,
    addEmployee,
    updateEmpRole,
    updateManager

}