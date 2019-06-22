import express from 'express';
import logger from 'morgan';
import app from './init'

import auth from './routes/middleware/auth';
import * as login from './routes/login';
import * as  booking from './routes/booking';
import * as  client from './routes/client';
import * as  host from './routes/host';
import * as  room from './routes/room';
import * as employee from './routes/employee';

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/login', login.loginController);
app.use('/bookings', [auth, booking.bookingsController]);
app.use('/clients', [auth, client.clientController]);
app.use('/hosts', [auth, host.hostController]);
app.use('/rooms', [auth, room.roomController]);
app.use('/employee', [auth, employee.employeeController]);

app.use(logger('short', {
    skip: (req, res) => res.statusCode < 400
}));

app.use((req, res) => {
    res.status(404);
    res.send('Not Found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development.env' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`ARSOFT API listening - ${PORT} | ${new Date()}`);
});

export default app;