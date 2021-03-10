const connection = require("./Utils/connection");
const cTable = require('console.table');
var figlet = require('figlet');
var inquirer = require('inquirer');
const prompts = require("./Utils/prompts");
const viewFunctions = require("./Utils/viewfuncs")
const addFunctions = require("./Utils/addfuncs.js")
var mysql = require("mysql");


connection.connect((err) => {
    if (err) throw err;
    initArt();
})

function initArt() {
    figlet('Employee Tracking System', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
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
        }else if (response.main == "Exit application") {
            console.log("Now leaving employee database...")
            connection.end()
        } else {
             console.log("Invalid Option")
         }
        
    })
}





