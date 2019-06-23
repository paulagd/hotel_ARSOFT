import  * as SQL_REQUEST from '../database/mysql/queries'
import { parallel } from "async";

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
        parallel({
            booking: callback => {
                SQL_REQUEST.getBooking(req.params.id, (error, entity)=>{
                    entity.length ? SQL_REQUEST.getClient(entity[0].IDCLIENT, (error, entityClient)=>{
                        if (error)
                            callback(true, 404);
                        else{
                            callback(null, {reservation: entity, client: entityClient});
                        }
                    }) : SQL_REQUEST.getClient(entity.IDCLIENT, (error, entityClient)=>{
                        if (error)
                            callback(true, 404);
                        else{
                            callback(null, {reservation: entity, client: entityClient});
                        }
                    });
                });
            },
            all_hosts: callback =>{
                SQL_REQUEST.getHostsFromBooking(req.params.id, (error, hostsEntity)=>{
                    if (error)
                        callback(true, 404);
                    else {
                        callback(null, {hosts: hostsEntity});
                    }
                });
            },
            rooms: callback => {
                SQL_REQUEST.getRoomsFromReservation(req.params.id, (error, rooms) => {
                    if (error)
                        callback(true, 404);
                    else {
                        callback(null, {rooms: rooms});
                    }
                });
            },
        }, (err, results) =>{
            if (err)
                res.sendStatus(500);
            else{
                res.status(200).send(Object.assign(results.booking, results.all_hosts, results.rooms))
            }
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
export const getHostsFromBooking = (req, res) => {

    SQL_REQUEST.getHostsFromBooking(req.params.id, (error, entity) => {
        if (error)
            res.sendStatus(500);
        else
            res.status(200).send(entity);
    });
};