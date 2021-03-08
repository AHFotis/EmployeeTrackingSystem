const prompts = [
   {
        name: "main",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Role",
          "View Employees by Manager",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Exit application"
        ]
  },
]
        
     
module.exports = prompts