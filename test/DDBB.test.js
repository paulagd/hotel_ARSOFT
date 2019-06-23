import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe} from "mocha";
import sinon from 'sinon';

import './init.test';

import * as SQL_REQUEST from '../src/database/mysql/queries';
import {bookingInsert} from "./constants.test";
import db from '../src/database/mysql/connection';

const expect = chai.expect;
const assert = chai.assert;

let idTest = null;

describe('Running Data Base Tests', () => {
    describe('Insert test', () => {
        it('Check wrong insert', (done) => {
            SQL_REQUEST.addBooking({...bookingInsert, IDCLIENT: 5}, (error, entity) => {
                if (error)
                    assert.isOk(entity);
                else {
                    assert.fail(entity);
                }
                done();
            });
        });

        it('Check correct insert', (done) => {
            SQL_REQUEST.addBooking(bookingInsert, (error, entity) => {
                if (error)
                    assert.fail();
                else {
                    idTest = entity;
                    assert.isOk(entity);
                }
                done();
            });
        });
    });

    describe('Insert room to booking', () => {
        it('Insert incorrect room', (done) => {
            SQL_REQUEST.assignRoom2Reservation(idTest, [100], (error, entity) => {
                assert.isOk(error);
                done();
            });
        });

        it('Insert correct room', (done) => {
            SQL_REQUEST.assignRoom2Reservation(idTest, [1], (error, entity) => {
                assert.isNotOk(error);
                done();
            });
        });

    });

    describe('Check changes', () => {
        let booking = null;

        it('Get testing booking', (done) => {
            SQL_REQUEST.getBooking(idTest, (error, entity) => {
                assert.isNotOk(error);
                booking = entity;

                booking.CHECKIN = new Date(booking.CHECKIN).toISOString();
                bookingInsert.CHECKIN = new Date(bookingInsert.CHECKIN).toISOString();

                booking.CHECKOUT = new Date(booking.CHECKOUT).toISOString();
                bookingInsert.CHECKOUT = new Date(bookingInsert.CHECKOUT).toISOString();

                expect(booking).to.be.eql({...bookingInsert, ID: idTest});
                done();
            });
        });

        it('Get Rooms of booking', (done) => {
            SQL_REQUEST.getRoomsFromReservation(idTest, (error, entity) => {
                assert.isNotOk(error);
                expect(entity[0].ID).is.equal(1);
                done();
            });
        });
    });

    describe('Undo data base changes', () => {
        it('Delete test insert', (done) => {
            db.query(`DELETE FROM RESERVATION WHERE ID = ${idTest}`, (error, results, fields) => {
                assert.isNotOk(error);
                assert.isOk(results);
                done();
            });
        });

        it('Delete relation between booking and room', (done) => {
            db.query(`DELETE FROM RESERVATION_ROOM WHERE IDRESERVATION = ${idTest}`, (error, results, fields) => {
                assert.isNotOk(error);
                assert.isOk(results);
                done();
            });
        });
    });
});

