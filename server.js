const connection = require("./Utils/connection");
const cTable = require('console.table');
var figlet = require('figlet');

connection.connect((err) => {
    if (err) throw err;
    figlet('Employee Tracking System', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    // readEmps()
})

function readEmps() {
    console.log("Finding employees...");
    connection.query(
        "SELECT empid, first_name, last_name FROM employee",
        function(err, res) {
            if (err) throw err;
            const table = cTable.getTable(res)
            console.table(table);
            
        }    );
}