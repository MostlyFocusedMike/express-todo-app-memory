const controller = (req, res) => {
  const { Task, params: { taskId } } = req;
  const result = Task.delete(Number(taskId));
  if (!result) return res.status(404).send();

  res.status(204).send();
};

module.exports = controller;
