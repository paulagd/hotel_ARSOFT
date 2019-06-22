import * as jwt from 'jwt-simple';
import moment from 'moment';

import {updateEmployee} from "../database/mysql/queries/employee";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 * Create auth token.
 * @param user
 * @returns {{exp: number, token: string, refreshToken: string}}
 */
export const createToken = user => {
    let exp = moment().add(1, "d").unix();
    let iat = moment().unix();
    let token = jwt.encode({
        user,
        iat,
        exp
    }, TOKEN_SECRET);

    let refreshToken = jwt.encode({
        user,
        iat,
    }, TOKEN_SECRET);
    user.IAT = iat;
    updateEmployee(user, (err, user) => {
        if (err) console.log('Error updating employee token');
    });
    return {token, exp, refreshToken};
};