const connection = require("./Utils/connection")
const cTable = require('console.table');

connection.connect((err) => {
    if (err) throw err;
    readEmps()
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