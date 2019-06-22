import express from 'express';
import * as jwt from 'jwt-simple';
import moment from 'moment';

import {getEmployee} from "../../database/mysql/queries/employee";

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const auth = express.Router();

auth.options('/', (req, res, next) => {
   res.sendStatus(204);
});
auth.all('/', (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let payload = jwt.decode(token, TOKEN_SECRET);

        if (payload.exp <= moment().unix())
            return res.status(401).send('Token expired');

        getEmployee(payload.user.ID, (error, entity) => {
            if (!error && entity.IAT === payload.iat.toString()) {
                req.user = payload.user;
                next();
            } else
                return res.sendStatus(401);
        });
    } catch (e) {
        return res.status(403).send('Authorization is needed');
    }
});

export default auth;