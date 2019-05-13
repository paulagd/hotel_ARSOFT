import chai from 'chai';
import {describe} from "mocha";
import sinon from 'sinon';

const expect = chai.expect;
const assert = chai.assert;

const functionTest = (aux, callback) => {
    if (aux)
        callback();
};

describe('Test 1', () => {
    it('Check addition', () => {

        let x = 3;
        let y = 4;

        let sum = x + y;

        expect(sum).to.be.equal(7);

        assert.isOk('everything', 'everything is ok');

        //https://www.chaijs.com/api/bdd/
        //https://www.chaijs.com/api/assert/
    });

    it('Check addition ko', () => {

        let x = 3;
        let y = 4;

        let sum = x + y;

        expect(sum).to.be.equal(2);

    });
});

describe('Test 2', () => {
    it('Check callback', () => {

        const callback = sinon.spy();

        functionTest(true, callback);

        sinon.assert.calledOnce(callback);

        //https://sinonjs.org/releases/latest/assertions/
    });

    it('Check callback ko', () => {

        const callback = sinon.spy();

        functionTest(true, callback);
        functionTest(true, callback);

        sinon.assert.calledOnce(callback);
    });
});