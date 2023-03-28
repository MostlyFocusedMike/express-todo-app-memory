const controller = (req, res) => {
  res.json(req.Task.list());
};

module.exports = controller;
