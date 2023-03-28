const controller = (req, res) => {
  const {
    Task,
    params: { taskId },
    body: { isDone },
  } = req;
  const task = Task.updateCompletion(Number(taskId), isDone);
  if (!task) return res.status(404).send();
  res.json(task);
};

module.exports = controller;
