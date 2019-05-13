import db from './db';

export const getBooking = (id, callback) => {
<<<<<<< HEAD
    db.query(`SELECT * from RESERVATION where id=${id}`, (error, results, fields) => {
=======
    db.query(`SELECT * from RESERVATION where id = ${id}`, (error, results, fields) => {
>>>>>>> d30811037cb1ac0090ac6342ce4fa8d23b1a5328
        if (error) throw error;
        else
          callback(results);
    });
};

export const getBookings = (callback) => {
    db.query('SELECT * from RESERVATION', (error, results, fields) => {
        if (error) throw error;
        else
          callback(results);
    });
};
