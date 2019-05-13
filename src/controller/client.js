import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getClients = (req, res) => {
    SQL_REQUEST.getClients((entity)=>{
      res.status(200).send(entity);
    });
};

export const getClient = (req, res) => {
    SQL_REQUEST.getClient(entity.IDCLIENT, (entityClient)=>{
        res.status(200).send(entityClient);
    });
};
