import  * as SQL_REQUEST from '../database/mysql/queries'

/***
 *
 * @param req
 * @param res
 */
export const getBookings = (req, res) => {
      SQL_REQUEST.getBookings((entity)=>{
        res.status(200).send(entity);
      });
};

export const getBooking = (req, res) => {
    SQL_REQUEST.getBooking(req.params.id, (entity)=>{
      console.log(entity);
      SQL_REQUEST.getClient(entity.IDCLIENT, (entityClient)=>{
          res.status(200).send({reservation: entity, client: entityClient});
      });
    });
};
