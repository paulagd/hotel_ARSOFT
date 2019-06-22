import db from "../connection";

/**
 * Devuelve info de la tabla CLIENT y la tabla RESERVA en funcion de la id,
 * que puede ser el DNI del cliente o el localizador (id) de la reserva.
 * @param id
 * @param callback
 */
export const getEmployee = (id, callback) => {
    db.query(`SELECT * from EMPLOYEE where ID = ${id}`, (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results[0]);
    });
};


/**
 * Devuelve todos los empoyees.
 * @param callback
 */
export const getEmployees = (callback) => {
    db.query('SELECT * from EMPLOYEE', (error, results, fields) => {
        if (error) callback(true, null);
        else
            callback(false, results);
    });
};


/**
 * Create a new employee
 * @param data
 * @param callback
 */
export const registration = (data, callback) => {
    db.query(`INSERT INTO EMPLOYEE SET ?`,  data, (error, results, fields) => {
        if(error && error.code == 'ER_DUP_ENTRY')
            callback(true, {msg: 'User already taken'})
        // INSERT INTO `hotel`.`EMPLOYEE` (`NAME`, `DNI`, `IBAN`, `PASSWORD`) VALUES ('Adri', '12345678M', 'ES763364744', 'holi');
        else if (error) {
            callback(true, {code: 500});
        } else
            callback(false, results.affectedRows);
    });
};


/**
 *
 * @param data
 * @param callback
 */
export const updateEmployee = (data, callback) => {
    db.query(`UPDATE EMPLOYEE SET ? WHERE ID = ${data.ID}`, data, (error, results, fields) => {
        if (error) {
            callback(true);
        } else
            callback(false, results.affectedRows);
    });
};


/**
 * Check user and password for login
 * @param data: {{email: string, password: string}}
 * @param callback
 */
export const checkUser = (data, callback) => {
    const {password, email} = data;
    db.query(`SELECT * from EMPLOYEE WHERE EMAIL = '${email}' `,  null, (error, results, fields) => {
        if (error) {
            callback(true, {code: 500});
        } else {
            if (results && results[0] && results[0].PASSWORD === password)
                callback(false, results[0]);
            else
                callback(true, {msg: 'PASSWORD is incorrect.'});
        }
    });
};