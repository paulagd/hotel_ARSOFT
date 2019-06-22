import * as jwt from 'jwt-simple';
import {createToken} from "../services/oauth";
import {checkUser, getEmployee} from "../database/mysql/queries/employee";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 *
 * @param req
 * @param res
 * @returns {*}
 */
export const login = (req, res) => {
    try {
        if (typeof req.body.type === "undefined")
            return res.sendStatus(400);

        if (req.body.type === 'refreshToken') {
            let payload = jwt.decode(req.body.refreshToken, TOKEN_SECRET);
            getEmployee(payload.user.ID, (error, entity) => {
                if (!error && entity.IAT === payload.iat.toString())
                    return res.status(201).send(createToken(entity));
                else
                    return res.sendStatus(401);
            });
        } else
            checkUser(req.body, (error, entityClient) => {
                if (error)
                    if (entityClient.msg)
                        res.status(401).send(entityClient.msg);
                    else
                        res.sendStatus(500);
                else
                    return res.status(201).send(createToken(entityClient));
            });
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
};