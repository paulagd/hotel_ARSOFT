import mysql from 'mysql';
import {config} from 'dotenv';

const env = config().parsed;

const connection = mysql.createConnection({
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    password : env.MYSQL_PASS,
    database : env.MYSQL_DB
});

connection.connect(err => {
    if (err)
        console.error('error connecting: ' + err.stack);
});

export default connection;