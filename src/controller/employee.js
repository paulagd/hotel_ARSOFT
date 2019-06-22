import  * as SQL_REQUEST from '../database/mysql/queries'

export const registration = (req, res) => {
    SQL_REQUEST.registration(req.body, (error, entityClient)=>{
        if (error && entityClient && entityClient.msg)
            res.status(500).send(entityClient.msg);
        else if(error)
            res.sendStatus(500);
        else
            res.sendStatus(204);
    });
};

export const getEmployees = (req, res) => {
    SQL_REQUEST.getEmployees((error, entity)=>{
        if (error)
            res.sendStatus(500);
        else
            res.status(200).send(entity);
    });
};

export const getEmployee = (req, res) => {
    SQL_REQUEST.getEmployee(req.params.id, (error, entityClient)=>{
        if (error)
            res.sendStatus(404);
        else
            res.status(200).send(entityClient);
    });
};