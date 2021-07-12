'use strict';

const UserModel = require('./user.model');

const get = async (req) => {
  const { userId } = req.params;
  const users = UserModel.findById(userId);
  return users;
};

const getAll = async (req, res, next) => {
  const users = UserModel.findAll();
  return users;
};

const create = async (req, res, next) => {
  await UserModel.create(req.body);
  return true;
};

module.exports = {
  get,
  getAll,
  create
}