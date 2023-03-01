const bcrypt = require('bcrypt');
const sinon = require('sinon');
const { expect } = require('chai');

const usersService = require('../../src/services/users.services');
const usersRepo = require('../../src/repository/users.repository');
const InvalidRequest = require('../../src/errors/InvalidRequest');

describe('createUser', () => {
  let usersRepoStub;
  let bcryptStub;
  const username = 'testUser';
  const password = 'testPassword';

  beforeEach(() => {
    usersRepoStub = sinon.stub(usersRepo);
    bcryptStub = sinon.stub(bcrypt);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user with a valid username and password', async () => {
    const salt = 'testsalt';
    const passwordEncrypted = 'testpasswordencrypted';
    usersRepoStub.getDuplicateRegistrations.returns({ rows: [] });
    usersRepoStub.createUser.resolves();
    bcryptStub.genSalt.resolves(salt);
    bcryptStub.hash.resolves(passwordEncrypted);

    usersRepoStub.getDuplicateRegistrations.returns({ rows: [] });
    usersRepoStub.createUser.resolves();

    await usersService.createUser(username, password);

    expect(usersRepoStub.getDuplicateRegistrations.calledOnceWith(username)).to.be.true;
    expect(usersRepoStub.createUser.calledOnceWith(username, passwordEncrypted)).to.be.true;
  });

  it('should throw an InvalidRequest error if the user already exists', async () => {
    const duplicateUser = { username };
    usersRepoStub.getDuplicateRegistrations.returns({ rows: [duplicateUser] });

    try {
      await usersService.createUser(username, password);
    } catch (err) {
      expect(err).to.be.instanceOf(InvalidRequest);
      expect(err.message).to.equal('User already exists.');
    }

    expect(usersRepoStub.getDuplicateRegistrations.calledOnceWith(username)).to.be.true;
    expect(usersRepoStub.createUser.called).to.be.false;
  });
});
