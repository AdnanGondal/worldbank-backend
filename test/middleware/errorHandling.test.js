const sinon = require('sinon');
const chai = require('chai');
const {
  errorLogger,
  errorHandler,
  invalidPathHandler,
} = require('../../src/middleware/errorHandling');

const { expect } = chai;

describe('errorHandling middleware', () => {
  describe('errorLogger middleware', () => {
    let consoleStub;
    let nextStub;

    beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');
      nextStub = sinon.stub();
    });

    afterEach(() => {
      consoleStub.restore();
    });

    it('should log the error message and call next', () => {
      const error = new Error('test error');
      errorLogger(error, null, null, nextStub);
      expect(consoleStub.calledOnceWith(`error ${error.message}`)).to.be.true;
      expect(nextStub.calledOnce).to.be.true;
    });
  });

  describe('errorHandler middleware', () => {
    it('should set the response status and send error message for general error', () => {
      const error = new Error('test error');
      const status = 400;
      const response = {
        header: sinon.stub(),
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const nextStub = sinon.stub();

      errorHandler(error, null, response, nextStub);

      expect(response.header.calledOnceWith('Content-Type', 'application/json')).to.be.true;
      expect(response.status.calledOnceWith(status)).to.be.true;
      expect(response.send.calledOnceWith(error.message)).to.be.true;
    });
  });

  it('should set the response status and send error message for InvalidRequest', () => {
    const error = new Error('test error');
    const status = 400;
    const response = {
      header: sinon.stub(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    const nextStub = sinon.stub();

    errorHandler(error, null, response, nextStub);

    expect(response.header.calledOnceWith('Content-Type', 'application/json')).to.be.true;
    expect(response.status.calledOnceWith(status)).to.be.true;
    expect(response.send.calledOnceWith(error.message)).to.be.true;
  });

  describe('invalidPathHandler middleware', () => {
    it('should set the response status and send error message', () => {
      const request = {};
      const response = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };
      const nextStub = sinon.stub();

      invalidPathHandler(request, response, nextStub);

      expect(response.status.calledOnceWith(400)).to.be.true;
      expect(response.send.calledOnceWith('Invalid Path')).to.be.true;
    });
  });
});
