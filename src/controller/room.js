import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getRooms = (req, res) => {
    SQL_REQUEST.getAllRooms((error, entity)=>{
        if (error)
            res.sendStatus(500);
        else
            res.status(200).send(entity);
    });
};

export const getFreeRooms = (req, res) => {
    SQL_REQUEST.getFreeRooms((error, entity)=>{
        if (error)
            res.sendStatus(500);
        else
            res.status(200).send(entity);
    });
};

export const getRoom = (req, res) => {
    SQL_REQUEST.getRoom(req.params.id, (error, entityHost)=>{
        if (error)
            res.sendStatus(404);
        else
            res.status(200).send(entityHost);
    });
};
export const updateRoom = (req, res) => {
    SQL_REQUEST.updateRoom(req.params.id, req.body,(error, entityHost)=>{
        if (error)
            res.sendStatus(500);
        else if(entityHost > 0)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    });
};