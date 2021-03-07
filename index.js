const connection = require("./Utils/connection");
const cTable = require('console.table');
var figlet = require('figlet');
var inquirer = require('inquirer');
const prompts = require("./Utils/prompts");
const functions = require("./Utils/dbfunctions")
var mysql = require("mysql");

initArt();

connection.connect((err) => {
    if (err) throw err;
    primaryPrompt();
})


 function initArt() {
   figlet('Employee Tracking System', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
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
         } else if (response.main == "Add a Department") {
            functions.addDept();
        } else if (response.main == "Add a Role") {
            functions.addRole();
        }else if (response.main == "Add an Employee") {
            functions.addEmployee();
        }else if (response.main == "Exit application") {
            console.log("Now leaving employee database...")
            connection.end()
        } else {
             console.log("Invalid Option")
         }
        
    })
}





