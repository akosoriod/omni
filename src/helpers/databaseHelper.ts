import {  Connection } from "mysql2";
import  * as mysql from "mysql2";


export const pool = mysql.createPool({
            host: 'omni.cluster-crjgbytgvbtw.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: 'za7G*L%n8ngJ',
            database: 'omni',
            waitForConnections: true,
            connectionLimit: 50,
            queueLimit: 0
          });


