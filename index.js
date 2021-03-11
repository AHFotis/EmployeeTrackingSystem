const connection = require("./Utils/connection");
const cTable = require('console.table');
var figlet = require('figlet');
var inquirer = require('inquirer');
const prompts = require("./Utils/prompt");
const functions = require("./Utils/functions")
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
            functions.viewAll();
         }else if (response.main == 'View Employees by Department') {
            functions.viewDept();
         } else if (response.main == "View Employees by Role") {
            functions.viewRole();
         } else if (response.main == "View Employees by Manager") {
            functions.viewManager();
        }else if (response.main == "View Utilized Budget Per Department") {
            functions.viewBudget();
        }else if (response.main == "Add a Department") {
            functions.addDept();
        } else if (response.main == "Add a Role") {
            functions.addRole();
        }else if (response.main == "Add an Employee") {
            functions.addEmployee();
        }else if (response.main == "Update an Employee's Role") {
            functions.updateEmpRole();
        }else if (response.main == "Update an Employee's Manager") {
            functions.updateManager();
        }else if (response.main == "Delete Department") {
            functions.deleteDepartment();
        }else if (response.main == "Delete Role") {
            functions.deleteRole();
        }else if (response.main == "Delete Employee") {
            functions.deleteEmployee();
        }else if (response.main == "Exit application") {
            console.log(chalk.yellow("Now leaving employee database..."))
            connection.end()
        } else {
             console.log(chalk.red("Invalid Option"))
         }
        
    })
}




