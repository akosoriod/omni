import {  Connection } from "mysql2";
import  * as mysql from "mysql2";


const DB_PASSWORD = process.env.DB_PASSWORD || "za7G*L%n8ngJ";

export const pool = mysql.createPool({
            host: 'omni.cluster-crjgbytgvbtw.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: DB_PASSWORD,
            database: 'omni',
            waitForConnections: true,
            connectionLimit: 50,
            queueLimit: 0
          });


