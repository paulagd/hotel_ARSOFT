import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getBookings = (req, res) => {
      SQL_REQUEST.getBookings((error, entity)=>{
        res.status(200).send(entity);
      });
};

export const getBooking = (req, res) => {
    SQL_REQUEST.getBooking(req.params.id, (error, entity)=>{
        entity.length ? SQL_REQUEST.getClient(entity[0].IDCLIENT, (error, entityClient)=>{
            res.status(200).send({reservation: entity, client: entityClient});
        }) : SQL_REQUEST.getClient(entity.IDCLIENT, (error, entityClient)=>{
              res.status(200).send({reservation: entity, client: entityClient});
          });
    });
};

export const addBooking = (req, res) => {
    SQL_REQUEST.addBooking(req.body, (error, entity)=>{
        res.status(200).send(entity);
    });
};

export const updateBooking = (req, res) => {
    SQL_REQUEST.updateBooking(req.params.id, req.body, (error, entity)=>{
        res.status(200).send(entity);
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