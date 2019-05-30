import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getBookings = (req, res) => {
      SQL_REQUEST.getBookings((error, entity)=>{
          if (error)
              res.sendStatus(500);
          else
              res.status(200).send(entity);
      });
};

export const getBooking = (req, res) => {
    SQL_REQUEST.getBooking(req.params.id, (error, entity)=>{
        entity.length ? SQL_REQUEST.getClient(entity[0].IDCLIENT, (error, entityClient)=>{
            if (error)
                res.sendStatus(404);
            else
                res.status(200).send({reservation: entity, client: entityClient});
        }) : SQL_REQUEST.getClient(entity.IDCLIENT, (error, entityClient)=>{
            if (error)
                res.sendStatus(404);
            else
                res.status(200).send({reservation: entity, client: entityClient});
          });
    });
};

export const addBooking = (req, res) => {
    SQL_REQUEST.addBooking(req.body, (error, entity)=>{
        if (error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};

export const updateBooking = (req, res) => {
    SQL_REQUEST.updateBooking(req.params.id, req.body, (error, entity)=>{
        if (error)
            res.sendStatus(500);
        else if(entity > 0)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    });
};

export const addHost2Reservation = (req, res) => {

    SQL_REQUEST.addHost2Reservation(req.params.id, req.body, error => {
        if (error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};

export const assignRoom2Reservation = (req, res) => {

    SQL_REQUEST.assignRoom2Reservation(req.params.id, req.body, error => {
        if (error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};