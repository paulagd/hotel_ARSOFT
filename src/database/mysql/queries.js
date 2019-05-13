import db from './db';

export const getBooking = (id, callback) => {
    db.query(`SELECT * from RESERVATION where ID = ${id}`, (error, results, fields) => {
        if (error) {
            db.query(`SELECT * from RESERVATION where IDCLIENT = (SELECT id from CLIENT where DNI = '${id}')`,
                (error, results, fields) => {
                    console.log(results, error);
                    if (error) throw error;
                    callback(results[0]);
                });
        } else {
            callback(results[0]);
        }
    });
};

export const getBookings = (callback) => {
    db.query('SELECT * from RESERVATION', (error, results, fields) => {
        if (error) throw error;
        else
          callback(results[0]);
    });
};

export const getClient = (id, callback) => {
// Devuelve info de la tabla CLIENT y la tabla RESERVA en funcion de la id,
// que puede ser el DNI del cliente o el localizador (id) de la reserva.
    db.query(`SELECT * from CLIENT where ID = ${id}`, (error, results, fields) => {
        if (error) throw error;
        else
          callback(results[0]);
    });
};

export const getClients = (id, callback) => {
// Devuelve info de la tabla CLIENT y la tabla RESERVA en funcion de la id,
// que puede ser el DNI del cliente o el localizador (id) de la reserva.
    db.query('SELECT * from CLIENT', (error, results, fields) => {
        if (error) throw error;
        else
          callback(results[0]);
    });
};
