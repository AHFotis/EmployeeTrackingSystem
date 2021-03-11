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
        functions.reroute();
    });
   
}






