const bcrypt = require('bcrypt');

module.exports = class Users {
    constructor(id, firstname, lastname, username, email, password, permissions_level, birthday, sex) {
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

  static hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  checkPassword(password) {
    if(password == this.password){
      return true;
    }else{
      return false;
    }
    //return await bcrypt.compare(password, this.password);
  }

  toJSON() {
    const { password, ...users} = this;
    return users;
  }
}
