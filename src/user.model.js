'use strict';
const { v4 } = require('uuid');
const { getConnection } = require('../../config/database');

const userModel = {
  findById: (id) => {
    const user = getConnection()
      .get('users')
      .find({ id })
      .value();
    return user;
  },
  findAll: () => {
    const users = getConnection()
      .get('users')
      .value();
    return users;
  },
  create: async (user) => {
    const newUser = { ...user };
    newUser.id = v4();
    await getConnection()
      .get('users')
      .push(newUser)
      .write();
    return true;
  },
  update: async (id, data) => {
    const updateUser = await getConnection()
      .get('users')
      .find({ id })
      .assign(data)
      .write();
    return updateUser;
  },
  delete: async (id) => {
    await getConnection()
    .get('users')
    .remove({ id })
    .write();
  }
};

module.exports = userModel;