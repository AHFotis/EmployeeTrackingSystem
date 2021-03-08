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

function viewManager () {
    connection.query(
        "SELECT e.first_name employee_first, e.last_name  employee_last, m.first_name manager_first, m.last_name manager_last FROM employee e INNER JOIN employee m ON m.empid = e.manager_id",
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
        var dept = response.department.name;
        connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES ('" + role + "', '" + salary + "', (select deptid from department where name = '"+ dept + "'))",
            function(err, res) {
            if (err) throw err;
            console.log("Role Successfully Added!")
            reroute();
        })
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
    {
        type: 'input',
        name: 'role',
        message: "Please type in the new employee's role id.",
    },
    {
        type: 'input',
        name: 'manager',
        message: "Please type in the new employee's manager id.",
    },
]).then((response) => {
        var first = response.first;
        var last = response.last;
        var role = response.role;
        var manager = response.manager;
        // var dept = response.dept;
        connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + first + "', '" + last + "', '" + role + "', '" + manager + "')",
            function(err, res) {
            if (err) throw err;
            console.log("Role Successfully Added!")
            reroute();
        })
    })
}

// function addEmployee () {
//     connection.query(
//         "SELECT title FROM role",
//         function (err, res) {
//         if (err) throw err;
//         inquirer.prompt([
//     {
//         type: 'input',
//         name: 'first',
//         message: "Please type in the new employee's first name.",
//     },
//     {
//         type: 'input',
//         name: 'last',
//         message: "Please type in the new employee's last name.",
//     },
//     {
//         type: "list",
//         name: "role",
//         choices: function () {

//             return res.map((department) => ({
//                 name: department.name

//             }));

//         },
//         message: "Please select the role for this employee."
//     },
// ]).then((response) => {
//     console.log(response)
//         var first = response.first;
//         var last = response.last;
//         var role = response.role.name;
//         connection.query(
//             "SELECT first_name, last_name FROM employee WHERE manager_id = 'null'",
//             function(err, res) {
//               if (err) throw err;
//               console.table(res);
//               inquirer.prompt([
    
//                 {
//                     name: "role",
//                     type: "list",
//                     choices: function () {
            
//                         return res.map((manager) => ({
//                             name: manager.first_name + " " + manager.last_name
            
//                         }));
            
//                     },
//                     message: "Please select the manager for this role."
//                 }
//             ]).then((response) => {
//         connection.query(
//             "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + first + "', '" + last + "', (select roleid from role where title = '" + role + "'), (select empid from employee where first_name = '" + response.name.first_name + "' and last_name = '" + response.name.last_name + "'))",
//             function(err, res) {
//             if (err) throw err;
//             console.log("Role Successfully Added!")
//             reroute();
//         })
//         })
//     })
// })
// })
// }

function updateEmpRole () {
    connection.query(
        "SELECT first_name, last_name FROM employee",
        function(err, res) {
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
            ]).then((response) =>{
                console.log(response)
                //saving the response to an array so first and last name can be split
                let nameArray = response.employee.split(" ");
                connection.query(
                    "SELECT roleid, title FROM role",
                    function(err, res) {
                      if (err) throw err;
                      console.table(res);
                      inquirer.prompt([
            
                        {
                            name: "role",
                            type: "input",
                            message: "Please type in the role id for this employee's new role from the list above."
                        }
                    ]).then((response) => {
                        var firstN = nameArray[0];
                        var lastN = nameArray[1];
                        var newRole = response.role;
                       console.log(firstN, lastN, newRole)
                        
                        connection.query(
                            "UPDATE employee SET role_id = '" + newRole + "' WHERE first_name = '" + firstN + "' AND last_name = '" + lastN + "'",
                            function(err, res) {
                            if (err) throw err;
                            console.log("Employee Successfully Updated!")
                            reroute();
                        })
                    })
                    })
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