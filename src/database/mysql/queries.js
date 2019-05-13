import db from './db';

export const getBooking = (id, callback) => {
    db.query(`SELECT * from RESERVATION where id = ${id}`, (error, results, fields) => {
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
