import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getClients = (req, res) => {
    SQL_REQUEST.getClients((error, entity)=>{
        if (error)
            res.sendStatus(500);
        else
            res.status(200).send(entity);
    });
};

export const getClient = (req, res) => {
    SQL_REQUEST.getClient(req.params.id, (error, entityClient)=>{
        if (error)
            res.sendStatus(404);
        else
            res.status(200).send(entityClient);
    });
};

export const addClient = (req, res) => {
    SQL_REQUEST.addClient(req.body, (error, entityClient)=>{
        if (error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};

export const updateClient = (req, res) => {
    SQL_REQUEST.updateClient(req.params.id, req.body, (error, entityClient)=>{
        if (error)
            res.sendStatus(500);
        else if(entityClient > 0)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    });
};


