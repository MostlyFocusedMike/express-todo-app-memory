const controller = (req, res) => {
  const { Task, body: { title } } = req;
  const newTask = new Task(title);

  res.status(201).json(newTask);
};

module.exports = controller;
