const prompt = [
   {
        name: "main",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Role",
          "View Employees by Manager",
          "View Utilized Budget Per Department",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Update an Employee's Manager",
          "Delete Department",
          "Exit application"
        ]
  },
]

        
     
module.exports = prompt
  
