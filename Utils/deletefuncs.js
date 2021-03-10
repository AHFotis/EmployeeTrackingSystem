const connection = require("./connection")
var mysql = require("mysql");
const inquirer = require("inquirer");
const prompts = require("./prompt");
const addfuncs = require("./addfuncs")
const viewfuncs = require("./viewfuncs")

function deleteDepartment () {
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
                        console.log("Department Successfully Deleted!")
                        deleteReroute();
                    })
            })
        })
}

function deleteRole () {

}

function deleteEmployee () {

}

function deleteReroute() {
    inquirer.prompt(prompts)
.then((response) => {
     if (response.main == 'View All Employees') {
        viewfuncs.viewAll();
     }else if (response.main == 'View Employees by Department') {
         viewfuncs.viewDept();
     } else if (response.main == "View Employees by Role") {
         viewfuncs.viewRole();
     } else if (response.main == "View Employees by Manager") {
        viewfuncs.viewManager();
    }else if (response.main == "View Utilized Budget Per Department") {
        viewfuncs.viewBudget();
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
   
}    module.exports = {
        deleteDepartment,
}