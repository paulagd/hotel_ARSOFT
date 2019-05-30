import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getHosts = (req, res) => {
    SQL_REQUEST.getHosts((error, entity)=>{
        if (error)
            res.sendStatus(500);
        else
            res.status(200).send(entity);
    });
};

export const getHost = (req, res) => {
    SQL_REQUEST.getHost(req.params.id, (error, entityHost)=>{
        if (error)
            res.sendStatus(404);
        else
            res.status(200).send(entityHost);
    });
};

export const updateHost = (req, res) => {
    // en req.body necesito que me pase el objeto host entero
    SQL_REQUEST.updateHost(req.params.id, req.body , (error, entityHost)=>{
        if (error)
            res.sendStatus(500);
        else if(entityHost > 0)
            res.sendStatus(204);
        else
            res.sendStatus(404);
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
