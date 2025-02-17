import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe} from "mocha";
import sinon from 'sinon';

import app from '../src/app';

import {bookingEntity} from "./constants.test";

chai.use(chaiHttp);

const expect = chai.expect;
const assert = chai.assert;

const functionTest = (aux, callback) => {
    if (aux)
        callback();
};

describe('Running HTTP Server Tests', () => {
    describe('External End Points', () => {
        let token = null;

        it('Check Login Error', (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    type: 'password',
                    password: 'test', //8c4205ec33d8f6caeaaaa0c10a14138c
                    email: 'adri@gmail.com'
                }).end((err, res) => {

                expect(res).to.have.status(401);
                done();
            });
        });

        it('Check Login Correct', (done) => {
            chai.request(app)
                .post('/login')
                .send({
                    type: 'password',
                    password: '8c4205ec33d8f6caeaaaa0c10a14138c',
                    email: 'adri@gmail.com'
                }).end((err, res) => {
                expect(res).to.have.status(201);
                token = res.body.token;
                done();
            });
        });

        it('Get Bookings', (done) => {
            chai.request(app)
                .get('/bookings')
                .auth(token, {type: 'bearer'})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                });

            chai.request(app)
                .get('/bookings')
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });

        it('Get Booking', (done) => {
            chai.request(app)
                .get('/bookings/1')
                .auth(token, {type: 'bearer'})
                .end((err, res) => {

                    expect(res).to.have.status(200);
                    expect(res.body).to.be.eql(bookingEntity);
                    done();
                });
        });

    });
});