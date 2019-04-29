import express from 'express';
import logger from 'morgan';
import app from './init'

import {config} from 'dotenv';

const env = config().parsed;

app.use('/bookings', (req, res) => {
    res.status(200).send({
        bookings: [
            {id: 1},
            {id: 2}
        ]
    })
});

app.use(logger('short', {
    skip: (req, res) => res.statusCode < 400
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res) => {
    res.status(404);
    res.send('Not Found');
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development.env' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(env.PORT, () => {
    console.log(`ARSOFT API listening - ${env.PORT} | ${new Date()}`);
});