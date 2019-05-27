import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getHosts = (req, res) => {
    SQL_REQUEST.getHosts((error, entity)=>{
        res.status(200).send(entity);
    });
};

export const getHost = (req, res) => {
    SQL_REQUEST.getHost(req.params.id, (error, entityHost)=>{
        res.status(200).send(entityHost);
    });
};

export const updateHost = (req, res) => {
    // en req.body necesito que me pase el objeto host entero
    SQL_REQUEST.updateHost(req.params.id, req.body , (error, entityHost)=>{
        if (error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};

export const addHost = (req, res) => {
    // en req.body necesito que me pase el objeto host entero
    SQL_REQUEST.addHost(req.body, (error, entityHost)=>{
        if (error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};
