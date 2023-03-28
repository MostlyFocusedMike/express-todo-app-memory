const Task = require('../models/task');

const addModels = (req, res, next) => {
  req.Task = Task;
  next();
};

module.exports = addModels;
