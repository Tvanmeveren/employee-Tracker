const mysql = require('mysql2');


//async function setup() {
    const connection = mysql.createConnection( {
      host:"localhost",
      user: "root",
      password: "Mochiman123",
      database: "employees_db"
    });

    //return connection;
//}

//module.exports=setup()

module.exports=connection;