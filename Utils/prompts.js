function firstQ() {
    inquirer.prompt({
        name: "main",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Role",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "^C (EXIT)"
        ]
        });
}
