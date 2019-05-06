import  * as SQL_REQUEST from '../database/mysql/queries'

export const getBookings = (req, res) => {
      SQL_REQUEST.getBookings((entity)=>{
        res.status(200).send(entity);
      });
};

export const getBooking = (req, res) => {
    SQL_REQUEST.getBooking(req.params.id, (entity)=>{
      res.status(200).send(entity);
    });
};
