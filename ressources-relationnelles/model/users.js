const bcrypt = require("bcrypt");

module.exports = class Users {
  constructor(
    id,
    firstname,
    lastname,
    username,
    email,
    password,
    permissions_level,
    birthday,
    sex
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.permissions_level = permissions_level;
    this.birthday = birthday;
    this.sex = sex;
  }

  static async hashPassword(password) {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (e) {
      return e;
    }
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    const { password, ...users } = this;
    return users;
  }
};
