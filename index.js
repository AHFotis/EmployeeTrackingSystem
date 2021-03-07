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
        console.log(response)
         if (response.main == 'View All Employees') {
            functions.viewAll();
         }else if (response.main == 'View Employees by Department') {
             functions.viewDept();
         } else if (response.main == "View Employees by Role") {
             functions.viewRole();
         }
         
         else {
             console.log("not yet")
         }
        
    })
}


         

function readEmps() {
    console.log("Finding employees...");
    connection.query(
        "SELECT empid, first_name, last_name FROM employee",
        function(err, res) {
            if (err) throw err;
            const table = cTable.getTable(res)
            console.table(table);
            
        }  
          );
}

