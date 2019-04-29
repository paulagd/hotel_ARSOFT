import db from './db';

export const hola = () => {
    db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
};