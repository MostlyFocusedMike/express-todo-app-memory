const controller = (req, res) => {
  const { Task } = req;
  const result = Task.deleteAll();
  if (!result) return res.status(404).send();

  res.status(204).send();
};

module.exports = controller;
