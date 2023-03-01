const { expect } = require('chai');
const sinon = require('sinon');
const userController = require('../../src/controllers/users.controllers');
const userService = require('../../src/services/users.services');

describe('UserController', () => {
  describe('userRegister', () => {
    it('should create a new user and return a success message', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.stub();

      const createUserStub = sinon.stub(userService, 'createUser').resolves();
      await userController.userRegister(req, res, next);

      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith({ Message: 'User Registered' })).to.be.true;
      expect(createUserStub.calledOnceWith(req.body.username, req.body.password)).to.be.true;
      expect(next.notCalled).to.be.true;

      createUserStub.restore();
    });

    it('should call next with error if user creation fails', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword',
        },
      };
      const res = {
        status: sinon.stub(),
        json: sinon.stub(),
      };
      const next = sinon.stub();

      const error = new Error('User creation failed');
      const createUserStub = sinon.stub(userService, 'createUser').rejects(error);
      await userController.userRegister(req, res, next);

      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(createUserStub.calledOnceWith(req.body.username, req.body.password)).to.be.true;
      expect(next.calledOnceWith(error)).to.be.true;

      createUserStub.restore();
    });
  });
});
