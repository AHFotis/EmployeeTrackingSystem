const connection = require("./Utils/connection");
const cTable = require('console.table');
var figlet = require('figlet');
var inquirer = require('inquirer');
const prompts = require("./Utils/prompt");
const viewFunctions = require("./Utils/viewfuncs")
const addFunctions = require("./Utils/addfuncs.js")
const delFunctions = require("./Utils/deletefuncs")
var mysql = require("mysql");
const chalk = require('chalk');


connection.connect((err) => {
    if (err) throw err;
    initArt();
})

function initArt() {
    figlet('Employee Tracking System', function(err, data) {
        if (err) {
            console.log(chalk.red('Something went wrong...'));
            console.dir(err);
            return;
        }
        console.log(chalk.green(data))
        primaryPrompt();
    });
   
}

function primaryPrompt() {
    inquirer.prompt(prompts)
    .then((response) => {
         if (response.main == 'View All Employees') {
            viewFunctions.viewAll();
         }else if (response.main == 'View Employees by Department') {
            viewFunctions.viewDept();
         } else if (response.main == "View Employees by Role") {
            viewFunctions.viewRole();
         } else if (response.main == "View Employees by Manager") {
            viewFunctions.viewManager();
        }else if (response.main == "View Utilized Budget Per Department") {
            viewFunctions.viewBudget();
        }else if (response.main == "Add a Department") {
            addFunctions.addDept();
        } else if (response.main == "Add a Role") {
            addFunctions.addRole();
        }else if (response.main == "Add an Employee") {
            addFunctions.addEmployee();
        }else if (response.main == "Update an Employee's Role") {
            addFunctions.updateEmpRole();
        }else if (response.main == "Update an Employee's Manager") {
            addFunctions.updateManager();
        }else if (response.main == "Delete Department") {
            delFunctions.deleteDepartment();
        }else if (response.main == "Delete Role") {
            delFunctions.deleteRole();
        }else if (response.main == "Delete Employee") {
            delFunctions.deleteEmployee();
        }else if (response.main == "Exit application") {
            console.log(chalk.yellow("Now leaving employee database..."))
            connection.end()
        } else {
             console.log(chalk.red("Invalid Option"))
         }
        
    })
}





