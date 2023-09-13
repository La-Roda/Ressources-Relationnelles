const bcrypt = require('bcrypt');
const Users = require('../model/users');

describe('Users', () => {
  let user;

  beforeEach(() => {
    user = new Users(
      1,
      'John',
      'Doe',
      'johndoe',
      'johndoe@example.com',
      'password',
      1,
      '2000-01-01',
      'Male'
    );
  });

  it('should create a new instance of Users with correct values', () => {
    expect(user.id).toBe(1);
    expect(user.firstname).toBe('John');
    expect(user.lastname).toBe('Doe');
    expect(user.username).toBe('johndoe');
    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('password');
    expect(user.permissions_level).toBe(1);
    expect(user.birthday).toBe('2000-01-01');
    expect(user.sex).toBe('Male');
  });



  it('should return true if the password matches', () => {
    const password = 'password';
    expect(user.checkPassword(password)).toBe(true);
  });

  it('should return false if the password does not match', () => {
    const password = 'wrongpassword';
    expect(user.checkPassword(password)).toBe(false);
  });

  it('should return JSON representation of the user object', () => {
    const json = user.toJSON();
    expect(json).toEqual({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      permissions_level: 1,
      birthday: '2000-01-01',
      sex: 'Male'
    });
    expect(json.password).toBeUndefined();
  });
});