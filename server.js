const connection = require("./Utils/connection")

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
            console.table(res);
            
        }    );
}