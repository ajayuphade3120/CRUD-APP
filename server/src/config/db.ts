// import mysql from "mysql2/promise";
import { Pool } from  "pg"
//  export const db = mysql.createConnection({
// host: 'localhost',
//   user: 'root',
//   password: 'Root@123',
//   database: 'Practicetask'
    
// });
   
// export const sqlpool = mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: 'Root@123',
//         database: 'Practicetask'
//     });


  export const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Root@12345',
  database: 'Practicetask'
    });
