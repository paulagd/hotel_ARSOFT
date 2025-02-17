import db from './conector';
import {each} from "async";

//BOOKING
export const getBooking = (id, callback) => {
    db.query(`SELECT * from RESERVATION where ID = ${id}`, (error, results, fields) => {
        if (error) {
            callback(true, null);
        } else {
            if( results.length == 0 ){
                db.query(`SELECT * from RESERVATION where IDCLIENT = (SELECT id from CLIENT where DNI = '${id}')`,
                    (error, results, fields) => {
                        if (error) throw error;
                        callback(false, results);
                    });
            } else {
                callback(false, results[0]);
            }

        }
    });
};

export const getBookings = (callback) => {
    db.query('SELECT * from RESERVATION', (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results);
    });
};

export const addBooking = (booking, callback) => {
    db.query(`INSERT INTO RESERVATION SET ?`, booking, (error, results, fields) => {
        if (error) {
            callback(true, error);
        } else
            callback(false, results.insertId);
    });
};

export const updateBooking = (id, booking, callback) => {
    db.query(`UPDATE RESERVATION SET ? WHERE ID = ${id}`, booking, (error, results, fields) => {
        if (error) {
            callback(true);
        } else
            callback(false, results.affectedRows);
    });
};

export const addHost2Reservation = (id, body, callback) => {

    each(body, (id_host, cb) => {
        db.query(`INSERT INTO RESERVATION_HOST (IDRESERVATION, IDHOST) VALUES (${id}, ${id_host}) `, null, (err, results) => {
            if (err) {
                cb(err);
            } else
                cb();
        });
    }, err => {
        if (err)
            callback(true);
        else
            callback(false);
    });
};

export const assignRoom2Reservation = (id, body, callback) => {

    each(body, (id_room, cb) => {
        db.query(`INSERT INTO RESERVATION_ROOM (IDRESERVATION, IDROOM) VALUES (${id}, ${id_room}) `, null, (err, results) => {
            if (err) {
                cb(err);
            } else
                updateRoom(id_room, {'busy' : 1}, (err, results)=>{
                    if (err)
                        cb(err);
                    else
                        cb();
                });
        });
    }, err => {
        if (err)
            callback(true);
        else
            callback(false);
    });
};


export const getRoomsFromReservation = (id, callback) => {
    db.query(`SELECT ID, SIZE FROM ROOM where ID in (SELECT IDROOM FROM RESERVATION_ROOM where IDRESERVATION = ${id})`,
        (error, results, fields) => {
            if (error) {
                callback(true);
            } else {
                callback(false, results);
            }
        });
};

// CLIENT
export const getClient = (id, callback) => {
// Devuelve info de la tabla CLIENT y la tabla RESERVA en funcion de la id,
// que puede ser el DNI del cliente o el localizador (id) de la reserva.
    db.query(`SELECT * from CLIENT where ID = ${id}`, (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results[0]);
    });
};

export const getClients = (callback) => {
// Devuelve info de la tabla CLIENT y la tabla RESERVA en funcion de la id,
// que puede ser el DNI del cliente o el localizador (id) de la reserva.
    db.query('SELECT * from CLIENT', (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results);
    });
};

export const addClient = (client, callback) => {
    db.query(`INSERT INTO CLIENT SET ?`, client, (error, results, fields) => {
        if (error) {
            callback(true);
        } else
            callback(false, null);
    });
};

export const updateClient = (id, client, callback) => {
    db.query(`UPDATE CLIENT SET ? WHERE ID = ${id}`, client, (error, results, fields) => {
        if (error) {
            callback(true);
        } else
            callback(false, results.affectedRows);
    });
};

// HOST
export const getHosts = (callback) => {
    db.query('SELECT * from HOST', (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results);
    });
};

export const getHost = (id, callback) => {
    db.query(`SELECT * from HOST where ID = ${id}`, (error, results, fields) => {
        if (error) {
            db.query(`SELECT * from HOST where DNI = '${id}'`,
                (error, results, fields) => {
                    if (error) callback(true, null);
                    callback(false, results[0]);
                });
        } else {
            callback(false, results[0]);
        }
    });
};

export const getHostsFromBooking = (id, callback) => {
    db.query(`SELECT * FROM HOST where ID in (SELECT IDHOST FROM RESERVATION_HOST where IDRESERVATION = ${id})`,
        (error, results, fields) => {
        if (error) {
            callback(true);
        } else {
            callback(false, results);
        }
    });
};

export const updateHost = (id, host, callback) => {
    let date = new Date(host.BIRTHDATE);
    db.query(`UPDATE HOST SET NAME = '${host.NAME}', DNI = '${host.DNI}',
              BIRTHDATE = '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}' where (ID = ${id})`,
        (error, results, fields) => {
            if (error) {
                callback(true);
            } else
                callback(false, results.affectedRows);
        });
};

export const addHost = (host, callback) => {
    db.query(`INSERT INTO HOST SET ?`, host, (error, results, fields) => {
        if (error) {
            callback(true);
        } else
            callback(false, null);
    });
};


// ROOMS

export const getAllRooms = (callback) => {
    db.query('SELECT * from ROOM', (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results);
    });
};

export const getFreeRooms = (callback) => {
    db.query('SELECT * from ROOM where BUSY = 0', (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results);
    });
};

export const getRoom = (id, callback) => {
    db.query(`SELECT * from ROOM where ID = ${id}`, (error, results, fields) => {
        if (error) {
            callback(true, null);
        } else {
            callback(false, results[0]);
        }
    });
};

export const updateRoom = (id, room, callback) => {
    db.query(`UPDATE ROOM SET ? WHERE ID = ${id}`, room, (error, results, fields) => {
        if (error) {
            callback(true);
        } else
            callback(false, results.affectedRows);
    });
};