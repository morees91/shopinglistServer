


var mysql = require('mysql2');

// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '951753num',
//     database: 'learningarabic',
//     multipleStatements: true,
//     waitForConnections: true,
//     connectionLimit: 5,
//     queueLimit: 0
// });



// const knex = require('knex')({
//     client: 'mysql2',
//     connection: {
//         host: 'localhost',
//         user: 'root',
//         password: '951753num',
//         database: 'sessions',
//         multipleStatements: true,
//         waitForConnections: true,
//         connectionLimit: 5,
//         queueLimit: 0
//     }
//   });

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '68.178.244.158',
        user: 'momo1991',
        password: 'ramiabdo1',
        database: 'shoping_list',
        port:3306,
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0
    }
  });

// pool.getConnection(function (err) {
//     //if(err) throw err;
//     //pass the error to the cb instead of throwing it
//     if(err) {
//         throw err  
//     }

// });


module.exports = knex;


